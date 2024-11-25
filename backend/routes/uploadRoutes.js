import path from 'path'
import express from 'express'
import multer from 'multer'
import { upload } from '../middlewares/multerMiddleware.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';

const router=express.Router()

/*
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/")
    },
    filename:(req,file,cb)=>{
        const extname=path.extname(file.originalname)
        cb(null,`${file.fieldname}-${Date.now()}${extname}`)
    }
})

const fileFilter=(req,file,cb)=>{
    const filetypes=/jpe?g|png|webp/
    const mimetypes=/image\/jpe?g|image\/png|image\/webp/

    const extname=path.extname(file.originalname).toLowerCase()
    const mimetype=file.mimetype

    if(filetypes.test(extname) && mimetypes.test(mimetype)){
        cb(null,true)
    }else{
        cb(new Error("image only"),false)
    }
}

const upload=multer({storage,fileFilter})
const uploadSingleImage=upload.single("image")

router.post("/",(req,res)=>{
    uploadSingleImage(req,res,(err)=>{
        if(err){
            res.status(400).send({message:err.message})
        }else if(req.file){
            res.status(200).send({
                message:"image uploaded successfully",
                image:`/${req.file.path}`
            })
        }else{
            res.status(400).send({message:"no image file provided"})
        }
    })
})
*/

router.post("/", upload.single("image"), async (req, res) => {
    try {
      // TASK: get the file path from multer using .file
      const multerImagePath = req.file?.path;
      if (!multerImagePath) {
        return res.status(400).send({ message: "multer image path is required" });
      }
  
      const cloundinaryImageUrl = await uploadOnCloudinary(multerImagePath);
      if (!cloundinaryImageUrl || cloundinaryImageUrl.error) {
        // Check if there's an error message returned from Cloudinary
        const errorMessage = cloundinaryImageUrl ? cloundinaryImageUrl.error.message : "Unknown error occurred during upload to Cloudinary.";
        return res.status(400).json({ message: errorMessage });
    }
  
      return res.status(200).send({
        message: "image uploaded successfully",
        image: cloundinaryImageUrl.url,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

export default router

