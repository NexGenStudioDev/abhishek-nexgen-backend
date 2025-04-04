import { Router } from 'express';
import ProjectController from './Project.controller';
import AuthMiddleware from '../../../Middleware/Auth.middleware';
const router = Router();

router.post(
  '/v1/project/create',
  AuthMiddleware.Verify_Super_Admin,
  ProjectController.Create,
);
router.get(
  '/v1/project/find',
  AuthMiddleware.Verify_Super_Admin,
  ProjectController.Find,
);

router.delete(
  '/v1/project/delete',
  AuthMiddleware.Verify_Super_Admin,
  ProjectController.Delete,
);

export { router as ProjectRouter };
