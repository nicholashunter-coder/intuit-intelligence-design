import { readFileSync } from 'fs';
import { glob } from 'glob';
import matter from 'gray-matter';
import { config } from './config.js';

export interface DocChunk {
  title: string;
  description: string;
  path: string;
  url: string;
  content: string;
  section?: string;
}

function mdxToPlainText(mdx: string): string {
  return mdx
    .replace(/<[^>]+>/g, '')       // strip JSX/HTML tags
    .replace(/!\[.*?\]\(.*?\)/g, '') // strip images
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1') // links → text
    .replace(/^#{1,6}\s/gm, '')    // strip heading markers
    .replace(/[*_~`]/g, '')        // strip formatting
    .replace(/\n{3,}/g, '\n\n')    // collapse whitespace
    .trim();
}

function splitIntoSections(content: string): { heading: string; body: string }[] {
  const lines = content.split('\n');
  const sections: { heading: string; body: string }[] = [];
  let currentHeading = '';
  let currentBody: string[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^#{2,3}\s+(.+)/);
    if (headingMatch) {
      if (currentBody.length > 0) {
        sections.push({ heading: currentHeading, body: currentBody.join('\n').trim() });
      }
      currentHeading = headingMatch[1];
      currentBody = [];
    } else {
      currentBody.push(line);
    }
  }

  if (currentBody.length > 0) {
    sections.push({ heading: currentHeading, body: currentBody.join('\n').trim() });
  }

  return sections;
}

function filePathToUrl(filePath: string): string {
  const relative = filePath
    .replace(config.docsPath, '')
    .replace(/\/index\.mdx$/, '')
    .replace(/\.mdx$/, '');
  return `${config.siteUrl}/docs${relative}`;
}

export function loadDocs(): DocChunk[] {
  const files = glob.sync('**/*.mdx', { cwd: config.docsPath });
  const chunks: DocChunk[] = [];

  for (const file of files) {
    const fullPath = `${config.docsPath}/${file}`;
    const raw = readFileSync(fullPath, 'utf-8');
    const { data, content } = matter(raw);
    const plainContent = mdxToPlainText(content);
    const url = filePathToUrl(fullPath);

    const sections = splitIntoSections(content);

    if (sections.length <= 1) {
      chunks.push({
        title: data.title || file,
        description: data.description || '',
        path: file,
        url,
        content: plainContent,
      });
    } else {
      for (const section of sections) {
        const sectionText = mdxToPlainText(section.body);
        if (sectionText.length < 20) continue;
        chunks.push({
          title: data.title || file,
          description: data.description || '',
          path: file,
          url: section.heading ? `${url}#${section.heading.toLowerCase().replace(/\s+/g, '-')}` : url,
          content: sectionText,
          section: section.heading,
        });
      }
    }
  }

  return chunks;
}

export function searchDocs(chunks: DocChunk[], query: string): DocChunk[] {
  const queryLower = query.toLowerCase();
  const terms = queryLower.split(/\s+/).filter(t => t.length > 2);

  const scored = chunks.map(chunk => {
    const text = `${chunk.title} ${chunk.description} ${chunk.content} ${chunk.section || ''}`.toLowerCase();
    let score = 0;

    if (text.includes(queryLower)) score += 10;

    for (const term of terms) {
      const regex = new RegExp(term, 'gi');
      const matches = text.match(regex);
      if (matches) score += matches.length;
    }

    if (chunk.title.toLowerCase().includes(queryLower)) score += 5;
    if (chunk.section?.toLowerCase().includes(queryLower)) score += 3;

    return { chunk, score };
  });

  return scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(s => s.chunk);
}
