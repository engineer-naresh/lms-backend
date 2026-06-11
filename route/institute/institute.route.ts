import express,{Router} from 'express';
import createInstitute from '../../controller/institute/institute.controller.ts';
const router:Router = express.Router();
router.route('/institute').post(createInstitute);
export default router;