const express = require('express');
const router = express.Router();
const multer = require('multer');
const CloudinaryUploader = require('../connector/coudinary');
const ResponseHandler = require('../utils/responseHandler');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
});

const upload = multer({ storage });

router.post('/image', upload.single('image'), async (req, res, next) => {
  try {
    if (req.file && JSON.stringify(req.file) !== '{}') {
      let fileUploaded = await CloudinaryUploader.upload(req.file.path, 'image');

      let payload = {
        path: fileUploaded.public_id,
        url: fileUploaded.url,
        format: fileUploaded.format,
        resource_type: fileUploaded.resource_type,
      };

      return ResponseHandler.success(res, payload);
    } else {
      throw {message: 'NO_THING_TO_UPLOAD'}
    }
  } catch (error) {
    return ResponseHandler.error(res, { message: error.message });
  }
});

router.post('/images', upload.array('images', 10), async (req, res, next) => {
  try {
    if (req.files && JSON.stringify(req.files) !== '[]') {
      Promise.all(
        req.files.map(
          (file) =>
            new Promise((resolve, reject) => {
              CloudinaryUploader
                .upload(file.path, 'image')
                .then((result) => resolve(result))
                .catch((error) => reject(error));
            }),
        ),
      )
        .then((result) => {
          const payload = result.map((item) => ({
            path: item.public_id,
            url: item.url,
            format: item.format,
            resource_type: item.resource_type,
          }));
          console.log('upload images');
          console.log(payload);

          return ResponseHandler.success(res, payload);
        })
        .catch((error) => {
          return ResponseHandler.error(res, { message: error.message });
        });
    } else {
      throw {message: 'NO_THING_TO_UPLOAD'}
    }
  } catch (error) {
    return ResponseHandler.error(res, { message: error.message });
  }
});

module.exports = router;
