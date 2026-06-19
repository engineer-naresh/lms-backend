import express, {Router} from 'express';
import type { Request } from 'express';
import isLoggedIn from '../../../src/middleware/middleware.ts';
import asyncErrorHandler from '../../../services/asyncErrorHandler.ts';
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from '../../../controller/institute/course/course.controller.ts';
import {multer} from '../../../src/middleware/multerMiddleware.ts';
import { storage } from '../../../services/cloudinaryConfig.ts';
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
const router:Router = express.Router();
router.route('/course').post(asyncErrorHandler(isLoggedIn), upload.single('courseThumbnail'), asyncErrorHandler(createCourse));
router.route('/course').get(asyncErrorHandler(isLoggedIn),asyncErrorHandler(getAllCourse))
router.route('/course/:id').get(asyncErrorHandler(getSingleCourse)).delete(asyncErrorHandler(isLoggedIn), asyncErrorHandler(deleteCourse))  ;
export default router;
