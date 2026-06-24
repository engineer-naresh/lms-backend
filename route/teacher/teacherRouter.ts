import express,{Router} from 'express';
import asyncErrorHandler from '../../services/asyncErrorHandler.ts';
import {teacherLogin} from '../../controller/teacher/teacherController.ts';
const router:Router = express.Router();
router.route('/loginteacher').post(asyncErrorHandler(teacherLogin));
export default router;