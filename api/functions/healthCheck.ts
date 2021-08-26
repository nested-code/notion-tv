import type { Handler } from '@netlify/functions'

const handler: Handler = async (event, context) => {
  console.log({ event, context })
  return {
    statusCode: 200,
    body: 'OK'
  }
}

export { handler }
