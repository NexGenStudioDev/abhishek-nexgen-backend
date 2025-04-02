import jwt from 'jsonwebtoken';
import env_constant from '../constant/env.constant';
import jwtConstant from '../constant/jwt.constant';
import {
  jwtAccessTokenSchema,
  jwtRefreshTokenSchema,
} from '../api/v1/Auth/Auth.validator';
import tokenConstant from '../api/v1/token/token.constant';
import AuthDal from '../api/v1/Auth/Auth.dal';
import { ObjectId } from 'mongoose';

class Jwt_Utils {

private PRIVATE_KEY = env_constant.PRIVATE_KEY;
private PUBLIC_KEY = env_constant.PUBLIC_KEY;



  public generateAccessToken = async (payload: {
    userId: ObjectId | string;
  }): Promise<string> => {
    try {
      let { error } = jwtAccessTokenSchema.validate(payload, {
        abortEarly: false,
        allowUnknown: true,
        stripUnknown: true,
      });

      if (error) {
        throw new Error(
          `Validation error: ${error.details.map((x) => x.message).join(', ')}`,
        );
      }

      const token = jwt.sign(payload, this.PRIVATE_KEY as string, {
        expiresIn: jwtConstant.Expire_time,
        algorithm: jwtConstant.Algorithm,
        audience: jwtConstant.AUDIENCE,
        issuer: jwtConstant.ISSUER,
      });

      if (!token) {
        throw new Error(tokenConstant.TOKEN_CREATED_FAILED);
      }

      return token;
    } catch (error) {
      console.error('Error generating access token:', error);
      throw error;
    }
  };

  public generateRefreshToken = async (payload: {
    userId: ObjectId | string;
  }): Promise<string> => {
    try {
      let { error } = jwtRefreshTokenSchema.validate(payload.userId);

      if (error) {
        throw new Error(
          `Validation error: ${error.details.map((x) => x.message).join(', ')}`,
        );
      }

      const token = jwt.sign(payload, this.PRIVATE_KEY as string, {
        expiresIn: '7d',
        audience: jwtConstant.AUDIENCE,
        issuer: jwtConstant.ISSUER,
      });

      if (!token) {
        throw new Error(tokenConstant.TOKEN_CREATED_FAILED);
      }

      return token;
    } catch (error) {
      console.error('Error generating refresh token:', error);
      throw error;
    }
  };

  public verifyJWT_TOKEN = async (
    token: string,
    tokenType: 'access' | 'refresh' | 'action',
    algorithm: string,
    serviceName: string,
    CURRENT_SERVICE: string,
  ): Promise<any> => {
    try {
      const verifyOptions = {
        algorithms: [algorithm] as jwt.Algorithm[],
        audience: serviceName,
        issuer: CURRENT_SERVICE,
      };

      const decoded = jwt.verify(
        token,
        env_constant.JWT_SECRET as string,
        verifyOptions,
      );

      if (tokenType === 'refresh') {
        const storedToken = await AuthDal.getAuthByRefreshToken(token);
        if (!storedToken) {
          throw new Error(tokenConstant.TOKEN_NOT_FOUND);
        }
      }

      return decoded;
    } catch (error) {
      console.error('Error verifying token:', error);
      throw new Error(tokenConstant.TOKEN_INVALID);
    }
  };
}

export default new Jwt_Utils();
