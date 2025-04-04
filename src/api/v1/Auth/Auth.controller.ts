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
import { create } from 'domain';
import { IToken } from '../token/token.type';
import tokenUtils from '../token/token.utils';

class AuthController {
  private generateAccessAndRefreshToken(userId: string) {
    let AccessToken = JwtUtils.generateAccessToken({ userId });
    let RefreshToken = JwtUtils.generateRefreshToken({ userId });

    return { AccessToken, RefreshToken };
  }

  private setTokenCookies(
    res: Response,
    accessToken: string,
    refreshToken: string,
  ) {
    res.header('Access-Control-Expose-Headers', 'set-cookie, authorization');
    res.setHeader('authorization', accessToken);
    res.cookie('refresh-token', refreshToken, {
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
        name,
        email,
        hashPassword,
        role: 'Admin',
      });

      let genAccessAndRefreshToken = await this.generateAccessAndRefreshToken(
        String(user._id),
      );

      let AccessToken = await genAccessAndRefreshToken.AccessToken;
      let RefreshToken = await genAccessAndRefreshToken.RefreshToken;

      let CreateToken_Option = {
        userId: String(user._id),
        refreshToken: RefreshToken,
        accessToken: AccessToken,
      } as IToken;

      const token =
        await tokenService.createTokenAndRefreshToken(CreateToken_Option);

      this.setTokenCookies(res, String(AccessToken), String(RefreshToken));

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

      const refreshToken = await AuthDal.getAuthByRefreshToken(
        user.refreshToken,
      );

      if (!refreshToken) {
        throw new Error('Invalid token');
      }

      let token = await tokenUtils.getTokenByUserId(String(user._id));

      let verify_Token = await JwtUtils.verifyJWT_TOKEN(
        String(token?.accessToken),
        'access',
      );

      this.setTokenCookies(
        res,
        String(token?.accessToken),
        String(token?.refreshToken),
      );
      let data = await AuthDal.User_Data(user, String(token?.accessToken));

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
