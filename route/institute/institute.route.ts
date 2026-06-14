import express,{Router} from 'express';
import  createInstitute from '../../controller/institute/institute.controller.ts';
import middleware from '../../src/middleware/middleware.ts';
const router:Router = express.Router();
router.route('/institute').post(middleware.isLoggedIn ,createInstitute);
// router.route('/teacher').post(createTeacher);
export default router;