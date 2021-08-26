import { login, LoginParams } from './api'

/** TVDB developer account API Key. */
let apiKey: string | undefined

/** TVDB subscription account User Pin. */
let userPin: string | undefined

/** Singleton store for lambda's token. */
let token: string | undefined

/** Get configured API Key, default to env variable. */
export const getApiKey = () => {
  if (!apiKey) apiKey = process.env.TVDB_API_KEY || ''
  return apiKey
}

/** Allow setting API Key programmatically, e.g. from CLI args */
export const setApiKey = (value: string) => {
  apiKey = value
}

/** Get configured User Pin, default to env variable. */
export const getUserPin = () => {
  if (!userPin) userPin = process.env.TVDB_USER_PIN || ''
  return userPin
}

/** Set User Pin programmatically, e.g. from CLI args */
export const setUserPin = (value: string) => {
  userPin = value
}

/** Fulfil the params interface for login request. */
export const getLoginParams = (): LoginParams => ({
  apikey: getApiKey(),
  pin: getUserPin()
})

/** Return existing token or get new one. */
export const getLoginToken = async (params?: LoginParams) => {
  if (!token) {
    if (!params) params = getLoginParams()
    const auth = process.env.TVDB_API_KEY || ''
    const data = await login(auth, params)
    token = data.token
  }
  return token
}
