import express,{Router} from 'express';
import  {createInstitute,  createStudent,  createTeacher, createCourse} from '../../controller/institute/institute.controller.ts';
import isLoggedIn from '../../src/middleware/middleware.ts';
import asyncErrorHandler from '../../services/asyncErrorHandler.ts';
const router:Router = express.Router();
router.route('/institute').post(asyncErrorHandler(isLoggedIn) ,asyncErrorHandler(createInstitute), asyncErrorHandler(createTeacher), asyncErrorHandler(createStudent), asyncErrorHandler(createCourse));
// router.route('/teacher').post(createTeacher);
export default router;