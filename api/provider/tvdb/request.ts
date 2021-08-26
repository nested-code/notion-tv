import fetch, { Response } from 'node-fetch'
import { URL } from 'url'

const API_URL = 'https://api4.thetvdb.com'
const API_VERSION = 'v4'

/** Param interface for GET request */
type GetParams = Record<string, string | number | boolean>

/** Param interface for POST request */
type PostParams = Record<string, unknown>

/** Data attribute for a single item. */
export type DataItem = Record<string, unknown>

/** Data attribute for an array of items. */
export type DataSet = Record<string, unknown>[]

/** Data attribute for item or array of items. */
export type DataType = DataItem | DataSet

/** TVDB API response JSON body attributes. */
export type ResponseBody = {
  status: 'failure'
  message: string
  data: null
} | {
  status: 'success'
  data: DataItem | DataSet
}

/** Custom error extension for debugging response failure. */
type ResponseError = Error & {
  response: {
    url?: string
    status: number
    statusText: string
  }
}

/** Check response for HTTP error. Throw or resolve the full response object */
export const checkHttp = (res: Response) => {
  if (
    res.status && res.status >= 400 &&
    !res.headers.get('content-type')?.includes('application/json')
  ) {
    let err = new Error(res.statusText) as ResponseError
    err.response = {
        url: res.url,
        status: res.status,
        statusText: res.statusText
    }
    throw(err)
  }
  return res
}

/** Check response for JSON error. Throw or resolve body as JSON object. */
export const checkJson = async (res: Response) => {
  const json = await res.json()
  if (json.Error) {
    let err = new Error(json.Error) as ResponseError
    err.response = {
      url: res.url,
      status: res.status,
      statusText: res.statusText
    }
    throw(err)
  }
  return json as ResponseBody
}

/** Check response body has success status. Throw or return body. */
export const checkSuccess = (json: ResponseBody) => {
  if (json.status === 'success') return json
  throw new Error(json.message)
}

/** Check for errors and data failure and return extracted data as given type. */
export const parseResponse = (res: Promise<Response>) =>
  res.then(checkHttp).then(checkJson).then(checkSuccess)

/** Create a URL with optional params object to stringify. */
export const createUrl = (endpoint: string, params: GetParams = {}) => {
  const url = new URL(`${API_URL}/${API_VERSION}/${endpoint}`)
  for (const key in params) {
    url.searchParams.append(key, params[key].toString())
  }
  return url.href
}

/** Make GET request function using API key or token in headers. */
export const makeGetRequest = <T extends DataType, P extends GetParams> (endpoint: string) =>
  /**
   * @param auth API key or login token
   * @param params Request payload
   */
  (auth: string, params: P) =>
    parseResponse(fetch(createUrl(endpoint, params), {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${auth}`,
        accept: 'application/json'
      }
    })).then(json => json.data as T)

/** Make POST request function using API key or token in headers. */
export const makePostRequest = <T extends DataType, P extends PostParams> (endpoint: string) =>
  /**
   * @param auth API key or login token
   * @param params Request payload
   */
  (auth: string, params?: P) =>
    parseResponse(fetch(createUrl(endpoint), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth}`,
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    })).then(json => json.data as T)
