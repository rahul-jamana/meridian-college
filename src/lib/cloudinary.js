import { Cloudinary } from '@cloudinary/url-gen'

// Initialize Cloudinary with your cloud name
// The VITE_ env var is baked in at build time; fallback to the known cloud name
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dbmpqbgar'

const cld = new Cloudinary({
  cloud: {
    cloudName: CLOUD_NAME,
  },
})

export default cld

/**
 * Helper: Get optimized Cloudinary image URL
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @param {object} options - Optional transformations
 * @returns {string} - Optimized image URL
 * 
 * Usage in components:
 *   import { getImageUrl } from '../lib/cloudinary'
 *   <img src={getImageUrl('folder/image_name')} alt="..." />
 */
export function getImageUrl(publicId, { width, height, quality = 'auto', format = 'auto' } = {}) {
  let transforms = `f_${format},q_${quality}`
  if (width) transforms += `,w_${width}`
  if (height) transforms += `,h_${height}`
  transforms += ',c_fill,g_auto'

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`
}

