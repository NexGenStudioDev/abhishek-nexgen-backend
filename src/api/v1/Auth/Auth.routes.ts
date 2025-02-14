import { Router } from 'express';
import { AuthController } from './Auth.controller';
const router = Router();

router.post('/auth/signUp', AuthController.signUp);
router.post('/auth/signIn', AuthController.login);

export { router as AuthRoutes };
