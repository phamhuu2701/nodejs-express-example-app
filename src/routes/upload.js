const express = require('express');
const { Promise } = require('mongoose');
const router = express.Router();
const multer = require('multer');
const { cloudinaryUploader } = require('../connector/coudinary');
const ResponseHandler = require('../utils/responseHandler');
const { ErrorMessage } = require('../variables/errorMessage');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
});

const upload = multer({ storage });

router.post('/image', upload.single('image'), async (req, res, next) => {
  try {
    if (req.file && JSON.stringify(req.file) !== '{}') {
      let fileUploaded = await cloudinaryUploader.upload(
        req.file.path,
        'image',
      );

      let payload = {
        path: fileUploaded.public_id,
        url: fileUploaded.url,
        format: fileUploaded.format,
        resource_type: fileUploaded.resource_type,
      };

      return ResponseHandler.success(res, payload);
    } else {
      return ResponseHandler.error(res, {
        message: ErrorMessage.NO_THING_TO_UPLOAD,
      });
    }
  } catch (error) {
    return ResponseHandler.error(res, { message: error.message });
  }
});

router.post('/images', upload.array('images', 12), async (req, res, next) => {
  try {
    if (req.files && JSON.stringify(req.files) !== '[]') {
      Promise.all(
        req.files.map(
          (file) =>
            new Promise((resolve, reject) => {
              cloudinaryUploader
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
          return ResponseHandler.success(res, payload);
        })
        .catch((error) => {
          return ResponseHandler.error(res, { message: error.message });
        });
    } else {
      return ResponseHandler.error(res, {
        message: ErrorMessage.NO_THING_TO_UPLOAD,
      });
    }
  } catch (error) {
    return ResponseHandler.error(res, { message: error.message });
  }
});

module.exports = router;
