const multer = require('multer');
const fs = require('fs');

// const fs = require('fs');

let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        let Id = req.body.emp_id;

        console.log(Id)
        cb(null, file.originalname);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

var upload = multer({ storage: storage });

let createUserImage = upload.single('images');





module.exports = createUserImage;