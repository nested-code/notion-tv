import { makeGetRequest } from '../request'

export type SearchParams = {
  /** additional search query param */
  query?: string
  /** restrict results to entity type */
  type?: 'movie' | 'series' | 'person' | 'company'
  /** restrict results to a year for movie|series */
  year?: number
  /** offset results */
  offset?: number
  /** limit results */
  limit?: number
}

export type SearchData = {
  aliases: string[],
  companies: string[],
  company_type: string,
  country: string,
  director: string,
  extendedTitle: string,
  genres: string[],
  id: string,
  image_url: string,
  name: string,
  name_translated: string,
  official_list: string,
  overview: string,
  overview_translated: string[],
  posters: string[],
  primary_language: string,
  primary_type: string,
  status: string,
  translations_with_lang: string[],
  tvdb_id: string,
  type: string,
  year: string,
  slug: string
}[]

export const search = makeGetRequest<SearchData, SearchParams>('search')
