import express, {Router} from 'express';
import type { Request } from 'express';
import isLoggedIn from '../../../src/middleware/middleware.ts';
import asyncErrorHandler from '../../../services/asyncErrorHandler.ts';
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from '../../../controller/institute/course/course.controller.ts';
import upload from '../../../src/middleware/multerUpload.ts';
const router:Router = express.Router();
router.route('/course').post(asyncErrorHandler(isLoggedIn), upload.single('courseThumbnail'), asyncErrorHandler(createCourse));
router.route('/course').get(asyncErrorHandler(isLoggedIn),asyncErrorHandler(getAllCourse))
router.route('/course/:id').get(asyncErrorHandler(getSingleCourse)).delete(asyncErrorHandler(isLoggedIn), asyncErrorHandler(deleteCourse))  ;
export default router;
