import { Router } from 'express';
import ProjectController from './Project.controller';
const router = Router();

router.post('/v1/project/create', ProjectController.Create);

export { router as ProjectRouter };
