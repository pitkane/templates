/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { VercelRequest, VercelResponse } from '@vercel/node'
import { Context, Telegraf } from 'telegraf'

const token = process.env.TELEGRAM_BOT_TOKEN
const secret = process.env.TELEGRAM_BOT_SECRET

if (!token || !secret) {
  throw new Error('TELEGRAM_BOT_TOKEN and TELEGRAM_BOT_SECRET must be provided!')
}

interface SessionData {
  justExample: number
}

interface BotContext extends Context {
  session?: SessionData
}

const telegramBot = new Telegraf<BotContext>(token)

telegramBot.command('test', (ctx) => {
  ctx.telegram.sendMessage(ctx.message.chat.id, `Hello ${ctx.message.from.username}`)
})

const telegramWebhook = async (request: VercelRequest, response: VercelResponse) => {
  // Make sure we have the correct secret. Could be hardened with IP restrictions etc....
  if (request.query.secret !== secret) {
    console.log('naughty naughty')
    return response.status(401).send('')
  }

  console.log(request.body)

  // let telegraf handle the request body
  await telegramBot.handleUpdate(request.body)

  response.status(200).send('')
}

export default telegramWebhook
