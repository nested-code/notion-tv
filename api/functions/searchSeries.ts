import type { Handler } from '@netlify/functions'
import * as netlify from '../provider/netlify'
import * as tvdb from '../provider/tvdb'
import { pickMap } from '../util/pick'

const defaultParams: tvdb.api.SearchParams = {
  limit: 3,
  type: 'series'
}

const searchSeries = async (params: Omit<tvdb.api.SearchParams, 'type'>) => {
  const token = await tvdb.getLoginToken()
  const data = await tvdb.api.search(token, { ...defaultParams, ...params })
  return pickMap(data, [
    'companies',
    'country',
    'id',
    'image_url',
    'name',
    'overview',
    'primary_language',
    'status',
    'tvdb_id',
    'year',
    'slug'
  ])
}

const handler: Handler = async (event) => {
  const data = await searchSeries(netlify.getParams(event))
  return netlify.dataResponse(data)
}

export { handler }
