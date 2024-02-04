const multer = require('multer');
const path=require('path')
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|pdf|doc|webp/;

  const mimetype = filetypes.test(file.mimetype);
  console.log(mimetype,"iiii")
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  console.log(extname,"ooopp")
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new Error("Invalid file type."));
  }
}


const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        console.log("multer success")
        
      cb(null, 'public/resortimages/')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    }
  });
  
  
  const uploadImage = multer({ storage: storage,
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  });
console.log("working of resort images")
module.exports={uploadImage}


