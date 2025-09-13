import { Router } from 'express';
import CallBackController from './CallBack.controller';
const router = Router();

router.post('/v1/Create-CallBack', CallBackController.CREATE_CALLBACK);

export { router as CallBack_Router };
