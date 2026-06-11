import express from 'express';
const app = express();
import authRoute from '../route/globals/auth.route.ts';
import instituteRoute from '../route/institute/institute.route.ts';

app.use(express.json());

app.use('/api',authRoute);
app.use('/api',instituteRoute);
export default app