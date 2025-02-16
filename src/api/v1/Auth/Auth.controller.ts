import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Auth_Service } from './Auth.service';
import AuthModel from './Auth.model';
import SendResponse from '../../../utils/SendResponse';
import StatusConstant from '../../../constant/Status.constant';
import AuthDal from './Auth.dal';
import AuthConstant from './Auth.constant';

export const AuthController = {
  signUp: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, Pasword } = req.body;

      console.log('req.body', req.body);
      let AuthInstance = new AuthModel();
      
      let Find_User = await AuthDal.FIND_byEmail(email);

      if (Find_User) {
        throw new Error('User already exists');
      }

      let AuthInstance = new AuthModel();

      console.log('hash password', hashPassword);

      const user = await Auth_Service.signUp({
        name,
        email,
        hashPassword,
        role,
        
      let hashPassword = await AuthInstance.hashPassword(Pasword);

      const user = await Auth_Service.signUp({
        name: name,
        email: email,
        hashPassword: hashPassword,
        role: 'Admin',
      });

      SendResponse.success(
        res,
        StatusConstant.CREATED,
        'User created successfully',
        user,
      );
    } catch (error: any) {
      SendResponse.error(res, StatusConstant.BAD_REQUEST, error.message);
    }
  },

  login: async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const user = await Auth_Service.signIn({ email, password });

      const token = await AuthDal.Encrept_Email(email);

      res.cookie('token', token);

      let data = await AuthDal.User_Data(user, token);

      SendResponse.success(
        res,
        StatusConstant.OK,
        AuthConstant.LOGIN_SUCCESS,
        data,
      );
    } catch (error: any) {
      SendResponse.error(res, StatusConstant.BAD_REQUEST, error.message);
    }
  },

  Remove_Auth_User: async (req: Request, res: Response): Promise<void> => {
    try {
    } catch (error: any) {
      SendResponse.error(res, StatusConstant.BAD_REQUEST, error.message);
    }
  },
};
