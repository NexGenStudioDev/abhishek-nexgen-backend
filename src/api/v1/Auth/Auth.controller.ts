import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Auth_Service } from './Auth.service';
import AuthModel from './Auth.model';
import SendResponse from '../../../utils/SendResponse';
import StatusConstant from '../../../constant/Status.constant';
import AuthDal from './Auth.dal';
import AuthConstant from './Auth.constant';

class AuthController {
  private setTokenCookies(res: Response, token: string) {
    res.set('authorization', token);
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
  }

  public signUp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, email, Password } = req.body;

      console.log(name, email, Password);
      let Find_User = await AuthModel.findOne({ email: email });
      console.log(Find_User);

      if (Find_User) {
        throw new Error('User already exists');
      }

      let AuthInstance = new AuthModel();

      let hashPassword = await AuthInstance.hashPassword(Password);

      const user = await Auth_Service.signUp({
        name: name,
        email: email,
        hashPassword: hashPassword,
        role: 'Admin',
      });

      const token = await AuthDal.Encrept_Email(email);
      this.setTokenCookies(res, token);

      SendResponse.success(
        res,
        StatusConstant.CREATED,
        'User created successfully',
        user,
      );
    } catch (error: any) {
      console.log(error);
      SendResponse.error(res, StatusConstant.BAD_REQUEST, error.message);
    }
  };

  public login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      const user = await Auth_Service.signIn({ email, password });

      const token = await AuthDal.Encrept_Email(email);

      this.setTokenCookies(res, token);

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
  };

  public logout = async (req: Request, res: Response): Promise<void> => {
    try {
      res.clearCookie('token');
      SendResponse.success(res, StatusConstant.OK, AuthConstant.LOGIN_SUCCESS);
    } catch (error: any) {
      SendResponse.error(res, StatusConstant.BAD_REQUEST, error.message);
    }
  };
}

export default new AuthController();
