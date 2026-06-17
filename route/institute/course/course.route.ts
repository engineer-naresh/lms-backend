import express, {Router} from 'express';
import isLoggedIn from '../../../src/middleware/middleware.ts';
import asyncErrorHandler from '../../../services/asyncErrorHandler.ts';
import { createCourse, deleteCourse, getAllCourse, getSingleCourse } from '../../../controller/institute/course/course.controller.ts';

const router:Router = express.Router();
router.route('/course').post(asyncErrorHandler(isLoggedIn), asyncErrorHandler(createCourse)).get(asyncErrorHandler(getAllCourse));
router.route('/course/:id').get(asyncErrorHandler(getSingleCourse)).delete(asyncErrorHandler(isLoggedIn), asyncErrorHandler(deleteCourse))  ;
export default router;
