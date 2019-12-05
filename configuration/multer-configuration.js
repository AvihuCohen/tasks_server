const multer = require('multer');

exports.fileStorage = multer.diskStorage(
    {
        destination: (req, file, cb) => {
            cb(null, 'images')
        },
        filename: (req, file, cb) => {
            cb(null, new Date().toISOString() + '-' + file.originalname);
        }
    }
);

exports.fileFilter = (req, file, cb) => {
    if(
        file.mimeType === 'image/png' ||
        file.mimeType === 'image/jpg' ||
        file.mimeType === 'image/jpeg'
    ){
        cb(null, true);
    }else {
        cb(null, false);
    }
};