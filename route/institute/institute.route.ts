import express,{Router} from 'express';
import  {createInstitute,  createStudent,  createTeacher, createCourse} from '../../controller/institute/institute.controller.ts';
import isLoggedIn from '../../src/middleware/middleware.ts';
const router:Router = express.Router();
router.route('/institute').post(isLoggedIn ,createInstitute, createTeacher, createStudent, createCourse);
// router.route('/teacher').post(createTeacher);
export default router;