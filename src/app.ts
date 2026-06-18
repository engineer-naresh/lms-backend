import express from 'express';
const app = express();
import authRoute from '../route/globals/auth.route.ts';
import instituteRoute from '../route/institute/institute.route.ts';
import courseRoute from '../route/institute/course/course.route.ts';
import studentRoute from '../route/institute/student/student.route.ts';
app.use(express.json());
app.use('/api',authRoute);
app.use('/api',instituteRoute);
app.use('/api/institute',courseRoute);
app.use('/api/institute',studentRoute);
export default app