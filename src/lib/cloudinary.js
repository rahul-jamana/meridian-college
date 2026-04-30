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
 * Cache-bust version — changes with every build so Cloudinary images
 * are never served stale after a redeploy.
 * We use the BUILD_TIME env var injected by Vite (see vite.config.js).
 * Falls back to a daily key so dev works without extra config.
 */
const CACHE_VERSION = import.meta.env.VITE_BUILD_TIME || new Date().toISOString().slice(0, 10)

/**
 * Helper: Get optimized Cloudinary image URL with cache busting
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @param {object} options - Optional transformations
 * @returns {string} - Optimized image URL that bypasses stale caches
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

  // Use Cloudinary's version parameter (v=) for cache busting
  // When the image is replaced on Cloudinary with the same public ID,
  // changing the version forces CDN + browser to fetch the new version.
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/v${CACHE_VERSION}/${publicId}`
}

/**
 * Helper: Get optimized Cloudinary video URL with cache busting
 */
export function getVideoUrl(publicId, { quality = 'auto' } = {}) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_${quality}/v${CACHE_VERSION}/${publicId}`
}
