const multer = require('multer')
const path = require('path')


const storage= multer.diskStorage({
  destination: function (req, file, cb){

    //err first
      cb(null,'api/uploads')
  },

  filename: function (req, file, cb){
    cb(null, `${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}` )
  }
}).

module.exports = storage;