# Sources Bot

A Slack bot that answers questions from the Sources design documentation. Works in two modes:

- **Search mode (MVP, no API key)** — finds relevant doc sections by keyword and posts them directly
- **LLM mode (with API key)** — generates polished answers using an LLM grounded in doc content

When the bot can't find an answer, it escalates to team members. When someone answers in the thread, the bot offers to add the Q&A to the documentation via a GitHub PR.

## Setup

### 1. Create a Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps) and create a new app
2. Enable **Socket Mode** (Settings > Socket Mode > toggle on) and generate an App-Level Token with `connections:write` scope
3. Add these **Bot Token Scopes** (OAuth & Permissions):
   - `app_mentions:read`
   - `chat:write`
   - `channels:history`
   - `groups:history`
   - `im:history`
   - `mpim:history`
4. Enable **Event Subscriptions** and subscribe to:
   - `app_mention`
   - `message.channels`
   - `message.groups`
5. Install the app to your workspace

### 2. Configure environment

```bash
cp .env.example .env
```

Required:
- `SLACK_BOT_TOKEN` — from OAuth & Permissions (starts with `xoxb-`)
- `SLACK_APP_TOKEN` — the App-Level Token (starts with `xapp-`)
- `SLACK_SIGNING_SECRET` — from Basic Information
- `GITHUB_TOKEN` — a PAT with `repo` scope (for creating PRs)
- `ESCALATION_USERS` — comma-separated Slack user IDs to tag when the bot can't answer

Optional (enables LLM mode):
- `OPENAI_API_KEY` — from platform.openai.com (or any OpenAI-compatible endpoint)

### 3. Run

```bash
npm install
npm run dev
```

## Usage

Mention the bot in any channel it's been invited to:

- `@SourcesBot What are the two source categories?` — searches docs and returns relevant sections
- `@SourcesBot How long do QB report links last?` — finds the Clarity expiry info
- `@SourcesBot refresh` — re-indexes the documentation after you push changes

### Upgrading to LLM mode

When you get an API key, just add `OPENAI_API_KEY` to your `.env` and uncomment the LLM block in `src/answer.ts`. The bot will start generating conversational answers instead of raw doc excerpts. Also run `npm install openai` to add the dependency.
