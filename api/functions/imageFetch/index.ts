import https from 'https'
import ibm from 'ibm-cos-sdk'
import type { Handler } from '@netlify/functions'
import * as netlify from '../../provider/netlify'

const {
  BUCKET_LOCATION,
  BUCKET_ENDPOINT,
  BUCKET_NAME,
  IBM_COS_API_KEY,
  IBM_COS_SERVICE_ID
} = process.env

const cos = new ibm.S3({
  signatureVersion: 'iam',
  endpoint: BUCKET_ENDPOINT,
  apiKeyId: IBM_COS_API_KEY,
  serviceInstanceId: IBM_COS_SERVICE_ID
})

const getImageBuffer = (url: string): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    const data: Uint8Array[] = []
    https.get(url, res => {
      res.on('data', chunk => data.push(chunk))
      res.on('end', () => resolve(Buffer.concat(data)))
      res.on('error', error => reject(error))
    })
  })

const uploadImageBuffer = (Key: string, Body: Buffer) =>
  cos.upload({ Bucket: BUCKET_NAME as string, Key, Body })
    .promise()
    .then(data => data.Location)

const imageExists = (Key: string) =>
  cos.headObject({ Bucket: BUCKET_NAME as string, Key })
    .promise()
    .then(data => !!data)
    .catch(err => !err)

export type ImageFetchParams = {
  id: string,
  url: string
}

export type ImageFetchData = {
  location: string,
  existed: boolean
}

const imageFetch = async ({ id, url }: ImageFetchParams): Promise<ImageFetchData> => {
  const key = `${id}.jpg`
  const existed = await imageExists(key)
  if (!existed) {
    console.log(`Series ${id} image uploading ${url}`)
    const buffer = await getImageBuffer(url)
    await uploadImageBuffer(key, buffer)
  } else {
    console.log(`Series ${id} image exists`)
  }
  const location = `${BUCKET_LOCATION}/${key}`
  console.log(`Serving image location ${location}`)
  return { location, existed }
}

export const handler: Handler = async (event) => {
  const data = await imageFetch(netlify.getParams(event))
  return netlify.dataResponse(data)
}
