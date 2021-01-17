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

router.post('/images', upload.array('images', 10), async (req, res, next) => {
  try {
    if (req.files && JSON.stringify(req.files) !== '[]') {
      Promise.all(
        req.files.map(
          (file) =>
            new Promise((resolve, reject) => {
              CloudinaryUploader.upload(file.path, 'image')
                .then((result) => resolve(result))
                .catch((error) => reject(error));
            }),
        ),
      )
        .then((results) => {
          const payload = results.map((item) => ({
            url: item.url,
            width: item.width,
            height: item.height,
            format: item.format,
            resource_type: item.resource_type,
          }));

          return ResponseHandler.success(res, payload);
        })
        .catch((error) => {
          return ResponseHandler.error(res, { message: error.message });
        });
    } else {
      throw { message: 'NOTHING_TO_UPLOAD' };
    }
  } catch (error) {
    console.log(error);
    return ResponseHandler.error(res, { message: error.message });
  }
});

module.exports = router;
