import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Auth_Service } from './Auth.service';

import { number } from 'joi';
import AuthModel from './Auth.model';
import SendResponse from '../../../utils/SendResponse';
import StatusConstant from '../../../constant/Status.constant';

export const AuthController = {
  signUp: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, password, role } = req.body;

      console.log('req.body', req.body);
      let AuthInstance = new AuthModel();

      let hashPassword = await AuthInstance.hashPassword(password);

      console.log('hash password', hashPassword);

      const user = await Auth_Service.signUp({
        name,
        email,
        hashPassword,
        role,
      });

      SendResponse.success(
        res,
        StatusConstant.CREATED,
        'User created successfully',
        'hii',
      );
    } catch (error: any) {
      SendResponse.error(res, StatusConstant.BAD_REQUEST, error.message);
    }
  },

  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const user = await Auth_Service.signIn({ email, password });

      SendResponse.success(res, StatusConstant.OK, 'Login successful', user);
    } catch (error: any) {
      SendResponse.error(res, StatusConstant.BAD_REQUEST, error.message);
    }
  },
};
