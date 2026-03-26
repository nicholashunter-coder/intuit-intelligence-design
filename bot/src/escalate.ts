import { config } from './config.js';

export function buildEscalationMessage(question: string): string {
  const userTags = config.escalationUsers.map(id => `<@${id}>`).join(' ');

  if (userTags) {
    return `I don't have an answer for that in the docs yet.\n\n${userTags} — can anyone help with this?\n\n> ${question}`;
  }

  return `I don't have an answer for that in the docs yet. If someone on the team knows, reply in this thread and I can add it to the documentation.`;
}
