import express,{Router} from 'express';
import  {createInstitute,  createStudent,  createTeacher, createCourse, createCategory} from '../../controller/institute/institute.controller.ts';
import isLoggedIn from '../../src/middleware/middleware.ts';
import asyncErrorHandler from '../../services/asyncErrorHandler.ts';
const router:Router = express.Router();
router.route('/institute').post(asyncErrorHandler(isLoggedIn) ,asyncErrorHandler(createInstitute),asyncErrorHandler(createCategory), asyncErrorHandler(createCourse),asyncErrorHandler(createTeacher), asyncErrorHandler(createStudent));
// router.route('/teacher').post(createTeacher);
export default router;