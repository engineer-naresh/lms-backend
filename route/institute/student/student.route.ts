import express, {Router} from 'express';
import asyncErrorHandler from '../../../services/asyncErrorHandler.ts';
import { getStudents } from '../../student/student.controller.ts';

const router:Router = express.Router();
router.route('/student').get(asyncErrorHandler(getStudents));
export default router;
