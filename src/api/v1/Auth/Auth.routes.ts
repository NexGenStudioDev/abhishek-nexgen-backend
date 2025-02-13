import { Router } from 'express';
const router = Router();


import {  AuthController } from './Auth.controller'; 


router.post('/auth/signUp', AuthController.signUp);
router.post('/auth/signIn', AuthController.login);



export { router as AuthRoutes };
