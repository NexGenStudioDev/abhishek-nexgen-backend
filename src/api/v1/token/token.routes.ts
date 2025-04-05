import { Router } from 'express';
import tokenController from './token.controller';
const router = Router();

router.put('/v1/renew-access-token', tokenController.RenewAccessToken);

export { router as Token_Router };
