import { makePostRequest } from '../request'

export type LoginParams = {
  apikey: string
  pin: string
}

export type LoginData = {
  token: string
}


/** Compose login request function. */
export const login = makePostRequest<LoginData, LoginParams>('login')
