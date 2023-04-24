import { Cloudinary } from '@cloudinary/url-gen'
import { env } from '../env/client.mjs'

const cld = new Cloudinary({
  cloud: {
    cloudName: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
})

type CloudinaryUploadResponse = {
  asset_id: string
  bytes: number
  created_at: string
  etag: string
  folder: string
  format: string
  height: number
  original_filename: string
  placeholder: boolean
  public_id: string
  resource_type: string
  secure_url: string
  signature: string
  tags: string[]
  type: string
  url: string
  version: number
  version_id: string
  width: number
}

export const uploadImageToCloudinary = async (
  file: File
): Promise<CloudinaryUploadResponse> => {
  const url = `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`
  const uploadPreset = 'udzvddrh'

  const form = new FormData()
  form.append('file', file)
  form.append('upload_preset', uploadPreset)

  const res = await fetch(url, {
    body: form,
    method: 'POST'
  })
  const data = await res.json()
  return data
}

export default cld
