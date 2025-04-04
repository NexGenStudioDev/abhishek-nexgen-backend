import env_constant from '../../../constant/env.constant';
import jwt from 'jsonwebtoken';
import AuthConstant from './Auth.constant';
import AuthModel from './Auth.model';
import { IAuth, IAuthRefreshToken } from './Auth.type';

class Auth_Dal {
  public FIND_byEmail = async (email: string) => {
    try {
      if (!email) {
        throw new Error(AuthConstant.EMAIL_REQUIRED);
      }

      let find_User = await AuthModel.findOne({ email: email });

      if (!find_User) {
        throw new Error(AuthConstant.FAIL_TO_FIND_USER);
      }
      return find_User;
    } catch (error: any) {
      throw new Error(error.message || AuthConstant.FAIL_TO_FIND_USER);
    }
  };

  public User_Data = async (user: object, token: string) => {
    let data = {
      user: user,
      token: token,
    };
    return data;
  };

  public FIND_BY_USER_ID = async (userId: string) => {
    try {
      if (!userId) {
        throw new Error(AuthConstant.USER_ID_REQUIRED);
      }

      let find_User = await AuthModel.findById(userId);

      if (!find_User) {
        throw new Error(AuthConstant.FAIL_TO_FIND_USER);
      }
      return find_User;
    } catch (error: any) {
      throw new Error(error.message || AuthConstant.FAIL_TO_FIND_USER);
    }
  };

  public isApproved = async (userId: string) => {
    try {
      if (!userId) {
        throw new Error(AuthConstant.EMAIL_REQUIRED);
      }
      let find_User = await this.FIND_BY_USER_ID(userId);

      if (find_User?.approved) {
        return true;
      }
      return false;
    } catch (error: any) {
      throw new Error(error.message || AuthConstant.NOT_APPROVED);
    }
  };

  public getAuthByRefreshToken = async (refreshToken: string) => {
    return AuthModel.findOne({ refreshToken }).select('refreshToken');
  };

  public updateRefreshToken = async ({
    refreshToken,
    userId,
  }: IAuthRefreshToken): Promise<IAuth> => {
    try {
      let Updated_Token = await AuthModel.findByIdAndUpdate(
        userId,
        { refreshToken: refreshToken },
        { new: true },
      );

      if (!Updated_Token) {
        throw new Error(AuthConstant.FAIL_TO_UPDATE_REFRESH_TOKEN);
      }

      return Updated_Token;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}

export default new Auth_Dal();
