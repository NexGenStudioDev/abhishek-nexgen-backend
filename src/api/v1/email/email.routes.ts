import { Router } from 'express';
const router = Router();
import Mail_Controller from './email.controller';
import AuthMiddleware from '../../../Middleware/Auth.middleware';

router.post(
  '/SendMail',
  AuthMiddleware.verifyRole('admin'),
  Mail_Controller.sendMail,
);

router.post(
  '/forgot/password/mail',
  AuthMiddleware.verifyRole('admin'),
  Mail_Controller.forgotPassword,
);

export { router as EmailRouter };
