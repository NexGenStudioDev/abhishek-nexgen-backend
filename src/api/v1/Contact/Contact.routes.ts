import { Router } from 'express';
import ContactController from './Contact.controller';
import AuthMiddleware from '../../../Middleware/Auth.middleware';
const router = Router();

router.post('/v1/Contact/create', ContactController.create);
router.get(
  '/v1/Contact/find',
  AuthMiddleware.verifyRole('admin'),
  ContactController.find,
);

export { router as ContactRouter };
