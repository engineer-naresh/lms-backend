import express,{Router} from "express";
import asyncErrorHandler from "../../../services/asyncErrorHandler.ts";
import isLoggedIn from "../../../src/middleware/middleware.ts";
import {createTeacher,getTeachers,deleteTeacher} from "../../../controller/institute/teacher/teacher.controller.ts";
import upload from "../../../src/middleware/multerUpload.ts";
const router:Router = express.Router();
router.route('/teacher').post(asyncErrorHandler(isLoggedIn),upload.single('teacherPhoto'),asyncErrorHandler(createTeacher));
router.route('/teacher').get(asyncErrorHandler(isLoggedIn),asyncErrorHandler(getTeachers));
router.route('/teacher/:id').delete(asyncErrorHandler(isLoggedIn),asyncErrorHandler(deleteTeacher));
export default router