import { Router } from 'express';
import technologyController from './technology.controller';
import AuthMiddleware from '../../../Middleware/Auth.middleware';

const router = Router();

router.get('/v1/find/technologies',technologyController.getTechnologies);
router.get(
  '/v1/find/single/technologies/:id',
  technologyController.getTechnologyById,
);
router.post('/v1/create/technologies', technologyController.createTechnology);
router.put(
  '/v1/update/technologies/:id',
  technologyController.updateTechnology,
);
router.delete(
  '/v1/delete/technologies/:id',
  technologyController.deleteTechnology,
);

export { router as TechnologyRoutes };
