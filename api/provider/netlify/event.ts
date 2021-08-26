import type { HandlerEvent } from '@netlify/functions'

export const getParams = <T>(event: HandlerEvent) => {
  let params = event.queryStringParameters
  let jsonBody
  if (event.body) {
    try {
      jsonBody = JSON.parse(event.body)
    }
    catch (err) {
      console.log(`ERROR PARSING "${event.body}"`)
      throw err
    }
  }
  return { ...params, ...jsonBody } as T
}
