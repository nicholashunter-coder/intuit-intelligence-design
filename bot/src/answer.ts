import { config } from './config.js';
import { DocChunk, loadDocs, searchDocs } from './docs-index.js';

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

  // --- LLM MODE (uncomment when you have an API key) ---
  // import OpenAI from 'openai';
  // const openai = new OpenAI({ apiKey: config.openai.apiKey });
  // const context = relevant.map((c, i) => {
  //   const sectionLabel = c.section ? ` > ${c.section}` : '';
  //   return `--- Source ${i + 1}: ${c.title}${sectionLabel} ---\n${c.content}`;
  // }).join('\n\n');
  // const completion = await openai.chat.completions.create({
  //   model: 'gpt-4o',
  //   temperature: 0.2,
  //   messages: [
  //     { role: 'system', content: 'You are a helpful assistant for the Intuit Intelligence Design team. Answer only from the provided context. If you cannot answer, say NOT_FOUND.' },
  //     { role: 'user', content: `Documentation context:\n\n${context}\n\n---\n\nQuestion: ${question}` },
  //   ],
  // });
  // const answer = completion.choices[0]?.message?.content?.trim() || '';
  // if (answer === 'NOT_FOUND') return { answered: false, response: '', sources: relevant };
  // return { answered: true, response: answer, sources: relevant };

  // --- SEARCH MODE (no API key needed) ---
  const topChunks = relevant.slice(0, 3);
  const response = topChunks
    .map(c => {
      const label = c.section ? `*${c.title} > ${c.section}*` : `*${c.title}*`;
      const snippet = c.content.length > 300 ? c.content.slice(0, 300) + '...' : c.content;
      return `${label}\n>${snippet.split('\n').join('\n>')}`;
    })
    .join('\n\n');

  return { answered: true, response, sources: topChunks };
}
