import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Auth_Service } from './Auth.service';
import SendResponse from 'utils/SendResponse';
import StatusConstant from 'constant/Status.constant';
import { number } from 'joi';
import AuthModel from './Auth.model';

export const AuthController = {
  signUp: async (req: Request, res: Response): Promise<void> => {

    try {
      const { name, email, password, role } = req.body;


     let hashPassword =   AuthModel.hashPassword(password);


      const user = await Auth_Service.signUp({ name, email, hashPassword, role });

      SendResponse.success(res, StatusConstant.CREATED, 'User created successfully', user);

    } catch (error: any) {
      SendResponse.error(res, StatusConstant.BAD_REQUEST, error.message);
    }

  },

  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;


      const user = await Auth_Service.signIn({ email, password });

      SendResponse.success(res, StatusConstant.OK, 'Login successful', user);


    } catch (error : any) {
      SendResponse.error(res, StatusConstant.BAD_REQUEST, error.message);
    }
  },
};
