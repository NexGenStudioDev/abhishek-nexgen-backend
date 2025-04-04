import { Router } from 'express';
import ContactController from './Contact.controller';
import AuthMiddleware from '../../../Middleware/Auth.middleware';
const router = Router();

router.post(
  '/v1/Contact/create',
  AuthMiddleware.Verify_Super_Admin,
  ContactController.create,
);
router.get(
  '/v1/Contact/find',
  AuthMiddleware.Verify_Super_Admin,
  ContactController.find,
);

export { router as ContactRouter };
