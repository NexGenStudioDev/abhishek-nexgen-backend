import { Router } from 'express';
import tokenController from './token.controller';
import AuthMiddleware from '../../../Middleware/Auth.middleware';
const router = Router();

router.post(
  '/v1/token/create',
  AuthMiddleware.Verify_Super_Admin,
  tokenController.createToken,
);

export { router as TokenRoutes };
