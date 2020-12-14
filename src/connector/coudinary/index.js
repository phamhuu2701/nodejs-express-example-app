const CONFIG = require('../../config');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: CONFIG.CLOUDINARY_NAME,
  api_key: CONFIG.CLOUDINARY_API_KEY,
  api_secret: CONFIG.CLOUDINARY_SECRET_KEY,
});

const imagesFolder = CONFIG.UPLOAD_FOLDER_NAME + '/uploads/images';
const videosFolder = CONFIG.UPLOAD_FOLDER_NAME + '/uploads/videos';
const filesFolder = CONFIG.UPLOAD_FOLDER_NAME + '/uploads/files';

const upload = (path, resource_type = 'image') => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload(path, {
          folder:
            resource_type === 'image'
              ? imagesFolder
              : resource_type === 'video'
              ? videosFolder
              : filesFolder,
          resource_type,
          public_id:
            (resource_type === 'image'
              ? 'IMAGE_'
              : resource_type === 'video'
              ? 'VIDEO_'
              : 'FILE_') + Date.now(),
        })
        .then((res) => {
          // remove file from server after uploaded
          fs.unlinkSync(path);

          resolve(res);
        })
        .catch((err) => reject(err));
    });
  } catch (err) {
    throw error;
  }
};

const destroy = (path) => {
  try {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(path, function (error, result) {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  } catch (error) {
    throw error;
  }
};

const CloudinaryUploader = {
  upload,
  destroy,
};

module.exports = CloudinaryUploader
