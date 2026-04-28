import { Cloudinary } from '@cloudinary/url-gen'

// Initialize Cloudinary with your cloud name
// Update VITE_CLOUDINARY_CLOUD_NAME in .env file with your actual cloud name
const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your_cloud_name_here',
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
  let image = cld.image(publicId)

  // Build URL manually for simplicity
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'your_cloud_name_here'
  let transforms = `f_${format},q_${quality}`
  if (width) transforms += `,w_${width}`
  if (height) transforms += `,h_${height}`
  transforms += ',c_fill,g_auto'

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/${publicId}`
}
