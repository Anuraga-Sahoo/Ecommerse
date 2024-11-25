import multer from "multer";

// TASK: created the middleware for the storage of the file
const storage = multer.diskStorage({
  // set the destination by using the callback
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  // set the filename by using the callback
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

// TASK: provided multer with the storage instructions, letting it act as the middleware
export const upload = multer({ storage: storage });