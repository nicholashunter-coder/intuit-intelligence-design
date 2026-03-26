import { Octokit } from '@octokit/rest';
import { config } from './config.js';

const octokit = new Octokit({ auth: config.github.token });

export async function createDocsPR(
  question: string,
  answer: string,
  answeredBy: string,
): Promise<string> {
  const { owner, repo } = config.github;
  const branchName = `docs/slack-qa-${Date.now()}`;
  const faqPath = 'content/docs/faq/index.mdx';

  const mainRef = await octokit.git.getRef({ owner, repo, ref: 'heads/main' });
  const mainSha = mainRef.data.object.sha;

  await octokit.git.createRef({
    owner,
    repo,
    ref: `refs/heads/${branchName}`,
    sha: mainSha,
  });

  let existingContent = '';
  let existingSha: string | undefined;
  try {
    const file = await octokit.repos.getContent({ owner, repo, path: faqPath });
    if ('content' in file.data && typeof file.data.content === 'string') {
      existingContent = Buffer.from(file.data.content, 'base64').toString('utf-8');
      existingSha = file.data.sha;
    }
  } catch {
    existingContent = `---\ntitle: FAQ\ndescription: Frequently asked questions about source treatments.\n---\n\n`;
  }

  const newEntry = `\n\n## ${question}\n\n${answer}\n\n*Added from Slack — answered by <@${answeredBy}>*\n`;
  const updatedContent = existingContent.trimEnd() + newEntry;

  await octokit.repos.createOrUpdateFileContents({
    owner,
    repo,
    path: faqPath,
    message: `docs: add FAQ from Slack — "${question}"`,
    content: Buffer.from(updatedContent).toString('base64'),
    branch: branchName,
    ...(existingSha ? { sha: existingSha } : {}),
  });

  const pr = await octokit.pulls.create({
    owner,
    repo,
    title: `docs: FAQ from Slack — "${question}"`,
    body: `## Source\nThis FAQ entry was captured from a Slack conversation.\n\n**Question:** ${question}\n**Answered by:** <@${answeredBy}>\n\n## Content added\n\n> **${question}**\n>\n> ${answer}`,
    head: branchName,
    base: 'main',
  });

  return pr.data.html_url;
}
