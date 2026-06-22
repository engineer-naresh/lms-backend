import type { Request } from 'express';
import {multer} from './multerMiddleware.ts';
import { storage } from '../../services/cloudinaryConfig.ts';
const upload = multer({ storage: storage,
    fileFilter :(req:Request, file:Express.Multer.File,cb:any)=>{
        const allowedFileTypes = ['image/png','image/jpeg','image/jpg']
        if(allowedFileTypes.includes(file.mimetype)){
            cb(null,true)
        }else{
            cb (new Error("Supports Image only"))
        }
    }
 });
 export default upload;