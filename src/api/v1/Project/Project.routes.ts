import { Router } from 'express';
import ProjectController from './Project.controller';
const router = Router();

router.post('/v1/project/create', ProjectController.Create);
router.get('/v1/project/find', ProjectController.Find);

router.delete('/v1/project/delete', ProjectController.Delete);

export { router as ProjectRouter };
