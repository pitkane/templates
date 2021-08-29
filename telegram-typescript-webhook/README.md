# Template - telegram-typescript-webhook

## Local development

Create the bot @ https://core.telegram.org/bots

Set the needed environment variables to `.env.local`.

TELEGRAM_BOT_TOKEN=''
TELEGRAM_BOT_SECRET=''

`npm ci`

Boot up ngrok: `ngrok http 3000`

Boot up the api: `npm run start` (setup Vercel app)

Set webhook with:

```
curl -X POST https://api.telegram.org/botYOUR_BOT_TOKEN/setWebhook -H "Content-type: application/json" -d '{"url": "https://NGROK_HTTPS_URL/api/telegram-webhook?secret=supersecretsecret"}'
```

Invoke bot with commands and your local app should receive the webhook events.
