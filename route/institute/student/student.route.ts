import express, {Router} from 'express';
import isLoggedIn from '../../../src/middleware/middleware.ts';
import asyncErrorHandler from '../../../services/asyncErrorHandler.ts';
import { getStudents } from '../../student/student.controller.ts';

const router:Router = express.Router();
router.route('/student').get(asyncErrorHandler(getStudents));
export default router;
