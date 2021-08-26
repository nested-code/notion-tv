import type { HandlerResponse } from '@netlify/functions'

export const dataResponse = <T> (data: T): HandlerResponse => ({
  statusCode: 200,
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
