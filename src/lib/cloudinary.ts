import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Uploads a buffer to Cloudinary and returns the secure URL
 */
export async function uploadImage(fileBuffer: Buffer, folder: string = 'polesin_articles'): Promise<string> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder },
      (error, result) => {
        if (error) reject(error);
        else resolve(result!.secure_url);
      }
    );
    uploadStream.end(fileBuffer);
  });
}

/**
 * Extracts publicId from Cloudinary secure_url and deletes the image
 */
export async function deleteImage(secureUrl: string): Promise<void> {
  if (!secureUrl || !secureUrl.includes('cloudinary.com')) return;

  try {
    // Example: https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg
    const parts = secureUrl.split('/');
    const uploadIndex = parts.findIndex(p => p === 'upload');
    if (uploadIndex === -1) return;
    
    // Get parts after 'upload/'
    const afterUpload = parts.slice(uploadIndex + 1);
    
    // Remove version tag (e.g. 'v12345678') if present
    if (afterUpload[0].startsWith('v') && !isNaN(parseInt(afterUpload[0].substring(1)))) {
      afterUpload.shift();
    }
    
    // Join remaining parts and remove file extension
    let publicId = afterUpload.join('/');
    const lastDotIndex = publicId.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      publicId = publicId.substring(0, lastDotIndex);
    }

    if (publicId) {
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error('Error deleting Cloudinary image:', error);
  }
}
