/**
 * Cloudinary Image Upload Utility
 * Handles client-side unsigned image uploads for artisan product photos
 */

export interface CloudinaryUploadResponse {
  public_id: string;
  url: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

export interface UploadProgress {
  percent: number;
  loaded: number;
  total: number;
}

const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_API_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
  console.warn('Cloudinary configuration missing. Check .env.local');
}

/**
 * Upload an image file to Cloudinary
 * @param file - The image file to upload
 * @param onProgress - Optional callback for upload progress
 * @returns Promise with upload response containing secure_url
 */
export async function uploadImageToCloudinary(
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<CloudinaryUploadResponse> {
  // Validate file
  if (!file) {
    throw new Error('No file provided');
  }

  // Check file size (max 10MB)
  const MAX_FILE_SIZE = 10 * 1024 * 1024;
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size exceeds 10MB limit');
  }

  // Check file type
  const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Please upload JPEG, PNG, WebP, or GIF');
  }

  // Create FormData
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET!);
  formData.append('folder', 'kalasetu/products'); // Organize uploads in folder
  formData.append('tags', 'kalasetu,product,artisan');
  formData.append('resource_type', 'auto');

  try {
    // Upload to Cloudinary with progress tracking
    const xhr = new XMLHttpRequest();

    // Track upload progress
    if (onProgress && xhr.upload) {
      xhr.upload.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = (e.loaded / e.total) * 100;
          onProgress({
            percent: Math.round(percentComplete),
            loaded: e.loaded,
            total: e.total,
          });
        }
      });
    }

    // Return promise-based interface
    return new Promise((resolve, reject) => {
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText) as CloudinaryUploadResponse;
            resolve(response);
          } catch (error) {
            reject(new Error('Failed to parse upload response'));
          }
        } else {
          const errorData = JSON.parse(xhr.responseText);
          reject(new Error(errorData.error?.message || 'Upload failed'));
        }
      });

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'));
      });

      xhr.addEventListener('abort', () => {
        reject(new Error('Upload cancelled'));
      });

      // Send request
      xhr.open('POST', CLOUDINARY_API_URL!);
      xhr.send(formData);
    });
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Unknown error during upload');
  }
}

/**
 * Validate that Cloudinary is properly configured
 */
export function validateCloudinaryConfig(): boolean {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    console.error('Cloudinary is not properly configured. Please set:');
    console.error('- NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME');
    console.error('- NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET');
    return false;
  }
  return true;
}

/**
 * Get optimized Cloudinary image URL with transformations
 * @param publicId - The public ID of the image
 * @param width - Optional width for responsive sizing
 * @param quality - Image quality (1-100, default 80)
 */
export function getOptimizedImageUrl(
  publicId: string,
  width?: number,
  quality: number = 80
): string {
  let url = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch`;

  const transforms: string[] = [];

  if (width) {
    transforms.push(`w_${width}`);
    transforms.push('c_scale');
  }

  transforms.push(`q_${quality}`);
  transforms.push('f_auto');

  if (transforms.length > 0) {
    url += `/${transforms.join(',')}`;
  }

  url += `/${publicId}`;

  return url;
}
