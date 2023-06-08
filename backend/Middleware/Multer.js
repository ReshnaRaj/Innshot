const multer = require('multer');

const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        console.log("multer success")
        
      cb(null, 'public/resortimages/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  });
  
  
  const uploadImage = multer({ storage: storage});
console.log("working of resort images")
module.exports=uploadImage


