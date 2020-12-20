const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
      destination: (req, file, cb) => {
            cb(null, 'imagesProduct/');
      },
      filename: (req, file, cb) => {
            console.log(file);
            cb(null, Date.now() + path.extname(file.originalname));
      }
});
const fileFilter = (req, file, cb) => {
      if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype == 'image/gif') {
            cb(null, true);
      } else {
            cb(null, false);
      }
}
const upload = multer({ storage: storage, fileFilter: fileFilter, limits: { fileSize: 10000000 } });


module.exports = {
      upload
} 