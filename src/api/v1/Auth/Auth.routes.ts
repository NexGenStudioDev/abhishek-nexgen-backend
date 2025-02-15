import { Router } from 'express';
import { AuthController } from './Auth.controller';
const router = Router();

router.post('/v1/auth/signUp', AuthController.signUp);
router.post('/v1/auth/signIn', AuthController.login);

export { router as AuthRoutes };
