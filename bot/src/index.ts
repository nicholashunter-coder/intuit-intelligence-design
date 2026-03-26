import { App } from '@slack/bolt';
import { config } from './config.js';
import { answerQuestion, refreshIndex } from './answer.js';
import { buildEscalationMessage } from './escalate.js';
import { createDocsPR } from './add-to-docs.js';

const app = new App({
  token: config.slack.botToken,
  appToken: config.slack.appToken,
  signingSecret: config.slack.signingSecret,
  socketMode: true,
});

const pendingQuestions = new Map<string, { question: string; threadTs: string; channel: string }>();

app.event('app_mention', async ({ event, say }) => {
  const question = event.text.replace(/<@[A-Z0-9]+>/g, '').trim();

  if (!question) {
    await say({ text: 'Ask me anything about Sources design! Just mention me with your question.', thread_ts: event.ts });
    return;
  }

  if (question.toLowerCase() === 'refresh') {
    refreshIndex();
    await say({ text: 'Doc index refreshed.', thread_ts: event.ts });
    return;
  }

  try {
    const result = await answerQuestion(question);

    if (result.answered) {
      const sourceLinks = result.sources
        .slice(0, 3)
        .map(s => `• <${s.url}|${s.title}${s.section ? ` > ${s.section}` : ''}>`)
        .join('\n');

      const header = config.useLLM
        ? result.response
        : `Here's what I found in the docs for: _"${question}"_\n\n${result.response}`;

      await say({
        text: `${header}\n\n*View in docs:*\n${sourceLinks}`,
        thread_ts: event.ts,
      });
    } else {
      const escalation = buildEscalationMessage(question);
      await say({ text: escalation, thread_ts: event.ts });

      pendingQuestions.set(event.ts, {
        question,
        threadTs: event.ts,
        channel: event.channel,
      });
    }
  } catch (error) {
    console.error('Error answering question:', error);
    await say({ text: 'Sorry, I hit an error trying to look that up. Please try again.', thread_ts: event.ts });
  }
});

app.event('message', async ({ event, say, client }) => {
  if (!('thread_ts' in event) || !event.thread_ts) return;
  if ('bot_id' in event && event.bot_id) return;

  const pending = pendingQuestions.get(event.thread_ts);
  if (!pending) return;

  const userId = 'user' in event ? event.user : undefined;
  if (!userId) return;

  const answerText = 'text' in event ? event.text || '' : '';
  if (answerText.length < 10) return;

  pendingQuestions.delete(event.thread_ts);

  await say({
    text: `Thanks <@${userId}>! Would you like me to add this to the documentation?`,
    thread_ts: event.thread_ts,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `Thanks <@${userId}>! Would you like me to add this to the documentation?\n\n> *Q:* ${pending.question}\n> *A:* ${answerText}`,
        },
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: { type: 'plain_text', text: 'Yes, add to docs' },
            style: 'primary',
            action_id: 'add_to_docs',
            value: JSON.stringify({
              question: pending.question,
              answer: answerText,
              answeredBy: userId,
            }),
          },
          {
            type: 'button',
            text: { type: 'plain_text', text: 'No thanks' },
            action_id: 'skip_add',
          },
        ],
      },
    ],
  });
});

app.action('add_to_docs', async ({ action, ack, body }) => {
  await ack();

  if (!('value' in action) || !action.value) return;
  const { question, answer, answeredBy } = JSON.parse(action.value);
  const threadTs = 'message' in body ? (body as any).message?.ts : undefined;
  const channel = 'channel' in body ? ((body as any).channel?.id || (body as any).channel) : undefined;

  try {
    const prUrl = await createDocsPR(question, answer, answeredBy);

    if (channel) {
      await app.client.chat.postMessage({
        token: config.slack.botToken,
        channel,
        thread_ts: threadTs,
        text: `Done! I've created a PR to add this to the FAQ: <${prUrl}|View PR>`,
      });
    }
  } catch (error) {
    console.error('Error creating PR:', error);
    if (channel) {
      await app.client.chat.postMessage({
        token: config.slack.botToken,
        channel,
        thread_ts: threadTs,
        text: 'Sorry, I hit an error creating the PR. Please add it manually.',
      });
    }
  }
});

app.action('skip_add', async ({ ack }) => {
  await ack();
});

(async () => {
  await app.start();
  console.log('Sources Bot is running in Socket Mode');
  refreshIndex();
})();
