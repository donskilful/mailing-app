import { Router, Request, Response } from 'express';
import mailTestingController from '../controllers/mailTestingController';

const router: Router = Router();

router.route('/mailing').post(mailTestingController.sendMail);

export default router;
