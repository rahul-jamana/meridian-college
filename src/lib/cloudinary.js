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
 * Cache-bust version — changes with every build.
 * We use a simple timestamp.
 */
const CACHE_VERSION = import.meta.env.VITE_BUILD_TIME || Date.now().toString();

/**
 * Helper: Get optimized Cloudinary image URL with cache busting
 */
export function getImageUrl(publicId, { width, height, quality = 'auto', format = 'auto' } = {}) {
  const cloudName = CLOUD_NAME;
  
  let transforms = `f_${format},q_${quality}`;
  if (width) transforms += `,w_${width}`;
  if (height) transforms += `,h_${height}`;
  transforms += ',c_fill,g_auto';

  // Construct URL. We use /v{version}/ as it's the standard Cloudinary way.
  // If images are broken, check the console for this URL.
  const url = `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/v${CACHE_VERSION}/${publicId}`;
  
  // Debug log for production (only once per ID)
  if (import.meta.env.DEV) {
    // console.log(`Cloudinary Image [${publicId}]:`, url);
  }

  return url;
}

/**
 * Helper: Get optimized Cloudinary video URL with cache busting
 */
export function getVideoUrl(publicId, { quality = 'auto' } = {}) {
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/q_${quality}/v${CACHE_VERSION}/${publicId}`;
}

/**
 * Upload a file (image or video) to Cloudinary using unsigned upload.
 * Requires an unsigned upload preset configured in the Cloudinary dashboard.
 * Returns the secure URL of the uploaded file.
 */
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'meridian_unsigned';

export async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', UPLOAD_PRESET);
  formData.append('folder', 'meridian'); // organize uploads in a folder

  const resourceType = file.type.startsWith('video') ? 'video' : 'image';
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/${resourceType}/upload`;

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData?.error?.message || `Upload failed (${response.status})`);
  }

  const data = await response.json();
  return {
    url: data.secure_url,
    publicId: data.public_id,
    type: resourceType,
  };
}
