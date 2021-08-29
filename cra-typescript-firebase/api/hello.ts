import { VercelRequest, VercelResponse } from '@vercel/node'

const hello = (request: VercelRequest, response: VercelResponse) => {
  response.status(200).json({
    query: request.query,
    date: new Date().toISOString(),
  })
}

export default hello
