import type { Handler } from '@netlify/functions'
import * as netlify from '../provider/netlify'
import * as tvdb from '../provider/tvdb'
import type { SearchData } from '../provider/tvdb/api'
import { Union, PickMap, pickMap } from '../util/pick'

const defaultParams: tvdb.api.SearchParams = {
  limit: 3,
  type: 'series'
}

const seriesKeys = [
  'companies',
  'country',
  'id',
  'image_url',
  'name',
  'name_translated',
  'overview',
  'primary_language',
  'status',
  'tvdb_id',
  'year',
  'slug'
] as const

export type Series = PickMap<SearchData, Union<typeof seriesKeys>>

const searchSeries = async (params: Omit<tvdb.api.SearchParams, 'type'>) => {
  const token = await tvdb.getLoginToken()
  const data = await tvdb.api.search(token, { ...defaultParams, ...params })
  console.log({ data })
  return pickMap(data, seriesKeys) as Series[]
}

const handler: Handler = async (event) => {
  const data = await searchSeries(netlify.getParams(event))
  return netlify.dataResponse(data)
}

export { handler }
