import { Router } from 'express';
import * as TechnologyController from './technology.controller';
const router = Router();

router.get('/v1/find/technologies', TechnologyController.getTechnologies);
router.get(
  '/v1/find/single/technologies/:id',
  TechnologyController.getTechnologyById,
);
router.post('/v1/create/technologies', TechnologyController.createTechnology); // Only Super Admin
router.put('/v1/technologies/:id', TechnologyController.updateTechnology); // Only Super Admin
router.delete(
  '/v1/delete/technologies/:id',
  TechnologyController.deleteTechnology,
); // Only Super Admin

export { router as TechnologyRoutes };
