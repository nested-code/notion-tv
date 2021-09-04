import type { Handler } from '@netlify/functions'

export const handler: Handler = async (event, context) => {
  console.log({ event, context })
  return {
    statusCode: 200,
    body: 'OK',
  }
}
