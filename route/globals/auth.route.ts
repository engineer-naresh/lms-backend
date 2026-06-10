import express, {Router} from 'express';
import {registerUser,loginUser} from '../../controller/globals/auth.controller.ts';

const router: Router = express.Router();
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
export default router;