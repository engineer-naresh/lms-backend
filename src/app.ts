import express from 'express';
const app = express();
import authRoute from '../route/globals/auth.route.ts';
import instituteRoute from '../route/institute/institute.route.ts';
import courseRoute from '../route/institute/course/course.route.ts';
import studentRoute from '../route/institute/student/student.route.ts';
import categoryRoute from '../route/institute/category/category.route.ts';
import teacherRoute from '../route/institute/teacher/teacher.route.ts'
app.use(express.json());
app.use('/api',authRoute);
app.use('/api',instituteRoute);
app.use('/api/institute',courseRoute);
app.use('/api/institute',studentRoute);
app.use('/api/institute',categoryRoute);
app.use('/api/institute',teacherRoute)
export default app