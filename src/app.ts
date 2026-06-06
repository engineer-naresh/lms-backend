import express from 'express';
const app = express();
import authRoute from '../route/globals/auth.route.ts';
app.use('/api',authRoute);
export default app