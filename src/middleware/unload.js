const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')  // где хранятся книги
    },
    filename(req, file,cb) {
        cb(null, `${Date.now()} - ${file.originalname}`) // получаем время и оригинальное имя фала
    }
})

module.exports = multer({storage}) 