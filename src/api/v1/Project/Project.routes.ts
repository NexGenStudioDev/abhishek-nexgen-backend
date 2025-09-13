import { Router } from 'express';
import ProjectController from './Project.controller';
import AuthMiddleware from '../../../Middleware/Auth.middleware';
const router = Router();

router.post(
  '/v1/project/create',
  AuthMiddleware.verifyRole('admin'),
  ProjectController.Create,
);
router.get('/v1/project/find', ProjectController.Find);

router.delete(
  '/v1/project/delete',
  AuthMiddleware.verifyRole('admin'),
  ProjectController.Delete,
);

export { router as ProjectRouter };
