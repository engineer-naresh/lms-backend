import express, {Router} from 'express';
import registerUser from '../../controller/globals/auth.controller.ts';

const router: Router = express.Router();
router.route('/register').post(registerUser);

export default router;