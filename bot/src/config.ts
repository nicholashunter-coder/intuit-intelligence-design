import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const config = {
  slack: {
    botToken: process.env.SLACK_BOT_TOKEN!,
    appToken: process.env.SLACK_APP_TOKEN!,
    signingSecret: process.env.SLACK_SIGNING_SECRET!,
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY!,
  },
  github: {
    token: process.env.GITHUB_TOKEN!,
    owner: process.env.GITHUB_OWNER || 'nicholashunter-coder',
    repo: process.env.GITHUB_REPO || 'intuit-intelligence-design',
  },
  docsPath: resolve(__dirname, '../../content/docs'),
  siteUrl: 'https://nicholashunter-coder.github.io/intuit-intelligence-design',
  escalationUsers: (process.env.ESCALATION_USERS || '').split(',').filter(Boolean),
};
