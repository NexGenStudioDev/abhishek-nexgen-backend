import { Router } from 'express';
import technologyController from './technology.controller';
import AuthMiddleware from '../../../Middleware/Auth.middleware';

const router = Router();

router.get(
  '/v1/find/technologies',
  AuthMiddleware.verifyRole('admin'),
  technologyController.getTechnologies,
);
router.get(
  '/v1/find/single/technologies/:id',
  AuthMiddleware.verifyRole('admin'),
  technologyController.getTechnologyById,
);
router.post(
  '/v1/create/technologies',
  AuthMiddleware.verifyRole('admin'),
  technologyController.createTechnology,
);
router.put(
  '/v1/update/technologies/:id',
  AuthMiddleware.verifyRole('admin'),
  technologyController.updateTechnology,
);
router.delete(
  '/v1/delete/technologies/:id',
  AuthMiddleware.verifyRole('admin'),
  technologyController.deleteTechnology,
);

router.get(
  '/v1/find/technologiesByUser',
  AuthMiddleware.verifyRole('admin'),
  technologyController.getTechnologyByUser,
);

router.post(
  '/v1/choose/technologies',
  AuthMiddleware.verifyRole('admin'),
  technologyController.chooseTechnology,
);

export { router as TechnologyRoutes };
