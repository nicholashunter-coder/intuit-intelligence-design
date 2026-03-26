# Sources Bot

A Slack bot that answers questions from the Sources design documentation using an LLM. When it can't find an answer, it escalates to team members and offers to add their responses to the docs via GitHub PR.

## Setup

### 1. Create a Slack App

1. Go to [api.slack.com/apps](https://api.slack.com/apps) and create a new app
2. Enable **Socket Mode** (Settings → Socket Mode → toggle on) and generate an App-Level Token with `connections:write` scope
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

Fill in:
- `SLACK_BOT_TOKEN` — from OAuth & Permissions (starts with `xoxb-`)
- `SLACK_APP_TOKEN` — the App-Level Token (starts with `xapp-`)
- `SLACK_SIGNING_SECRET` — from Basic Information
- `OPENAI_API_KEY` — from platform.openai.com
- `GITHUB_TOKEN` — a PAT with `repo` scope
- `ESCALATION_USERS` — comma-separated Slack user IDs to tag when the bot can't answer

### 3. Run

```bash
npm install
npm run dev
```

## Usage

Mention the bot in any channel it's been invited to:

- `@SourcesBot What are the two source categories?`
- `@SourcesBot How long do QB report links last?`
- `@SourcesBot refresh` — re-indexes the documentation

When the bot can't answer, it tags the configured team members. When someone replies in the thread, the bot offers to create a PR adding the Q&A to the FAQ page.
