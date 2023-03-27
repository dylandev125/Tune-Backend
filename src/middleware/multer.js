var multer = require('multer');
const fs = require("fs");

const dir = "uploads"

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
      callback(null, dir);
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname);
    }
});

const upload = multer({ storage : storage }).array('userPhotos', 20);

module.exports = { upload };