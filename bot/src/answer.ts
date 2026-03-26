import OpenAI from 'openai';
import { config } from './config.js';
import { DocChunk, loadDocs, searchDocs } from './docs-index.js';

const openai = new OpenAI({ apiKey: config.openai.apiKey });

let cachedChunks: DocChunk[] | null = null;

export function getChunks(): DocChunk[] {
  if (!cachedChunks) {
    cachedChunks = loadDocs();
    console.log(`Indexed ${cachedChunks.length} doc chunks`);
  }
  return cachedChunks;
}

export function refreshIndex(): void {
  cachedChunks = null;
  getChunks();
}

export interface AnswerResult {
  answered: boolean;
  response: string;
  sources: DocChunk[];
}

export async function answerQuestion(question: string): Promise<AnswerResult> {
  const chunks = getChunks();
  const relevant = searchDocs(chunks, question);

  if (relevant.length === 0) {
    return { answered: false, response: '', sources: [] };
  }

  const context = relevant
    .map((c, i) => {
      const sectionLabel = c.section ? ` > ${c.section}` : '';
      return `--- Source ${i + 1}: ${c.title}${sectionLabel} ---\n${c.content}`;
    })
    .join('\n\n');

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    temperature: 0.2,
    messages: [
      {
        role: 'system',
        content: `You are a helpful assistant for the Intuit Intelligence Design team. You answer questions about source treatments, design components, and documentation based ONLY on the provided context.

Rules:
- Only answer using information from the provided documentation context.
- If the context does not contain enough information to answer, respond with exactly: NOT_FOUND
- Keep answers concise and direct — 2-4 sentences max.
- Use plain language appropriate for designers and product managers.
- Do not make up information or speculate beyond the docs.`,
      },
      {
        role: 'user',
        content: `Documentation context:\n\n${context}\n\n---\n\nQuestion: ${question}`,
      },
    ],
  });

  const answer = completion.choices[0]?.message?.content?.trim() || '';

  if (answer === 'NOT_FOUND' || answer.includes('NOT_FOUND')) {
    return { answered: false, response: '', sources: relevant };
  }

  return { answered: true, response: answer, sources: relevant };
}
