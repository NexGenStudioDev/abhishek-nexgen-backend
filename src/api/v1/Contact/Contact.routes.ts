import { Router } from 'express';
import ContactController from './Contact.controller';
const router = Router();

router.post('/v1/Contact/create', ContactController.create);
router.get('/v1/Contact/find', ContactController.find);

export { router as ContactRouter };
