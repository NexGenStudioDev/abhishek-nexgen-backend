import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { Auth_Service } from './Auth.service';
import AuthModel from './Auth.model';
import SendResponse from '../../../utils/SendResponse';
import StatusConstant from '../../../constant/Status.constant';
import AuthDal from './Auth.dal';
import AuthConstant from './Auth.constant';
import tokenService from '../token/token.service';
import { jwtAccessTokenSchema } from './Auth.validator';
import JwtUtils from '../../../utils/Jwt.utils';

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

      let Find_User = await AuthModel.findOne({ email: email });
      

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

      console.log('user', user);

      let AccessToken = await JwtUtils.generateAccessToken({
        userId: String(user._id),
      });

      
      let RefreshToken = await JwtUtils.generateRefreshToken({
        userId: String(user._id),
      });

      let createTokenAndRefreshToken_Options = {
        userId: user._id,
        accessToken: AccessToken, // The JWT access token
        refreshToken: RefreshToken, // The JWT refresh token
      };

      console.log(
        'createTokenAndRefreshToken_Options',
        createTokenAndRefreshToken_Options,
      );

      // // const refreshToken = await tokenService.createTokenAndRefreshToken(createTokenAndRefreshToken_Options)
      // const token = await AuthDal.Encrept_Email(email);
      // this.setTokenCookies(res, token);

      // SendResponse.success(
      //   res,
      //   StatusConstant.CREATED,
      //   'User created successfully',
      //   user,
      // );
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
