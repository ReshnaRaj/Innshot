const multer = require('multer');

const storag = multer.diskStorage({
    
    destination: function (req, file, cb) {
        console.log("multer success")
        
      cb(null, 'public/resortimages/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  });
  
  
  const uploadImage = multer({ storage: storag});
console.log("working of resort images")
module.exports=uploadImage


