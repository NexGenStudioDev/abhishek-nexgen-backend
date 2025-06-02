import jwt, { JwtPayload } from 'jsonwebtoken';
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
    userId: string;
  }): Promise<string> => {
    try {
      const { error } = jwtAccessTokenSchema.validate(payload);

      if (error) {
        throw new Error(
          `Validation error: ${error.details.map((x) => x.message).join(', ')}`,
        );
      }

      const token = jwt.sign(payload, this.PRIVATE_KEY as string, {
        expiresIn: jwtConstant.Expire_time,
        algorithm: jwtConstant.Algorithm as jwt.Algorithm,

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
      const { error } = jwtRefreshTokenSchema.validate(payload);

      if (error) {
        throw new Error(
          `Validation error: ${error.details.map((x) => x.message).join(', ')}`,
        );
      }

      const token = jwt.sign(payload, this.PRIVATE_KEY as string, {
        expiresIn: '2y',
        algorithm: jwtConstant.Algorithm as jwt.Algorithm,
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
  ): Promise<JwtPayload> => {
    try {
      const verifyOptions = {
        algorithms: [jwtConstant.Algorithm] as jwt.Algorithm[],
        audience: jwtConstant.AUDIENCE,
        issuer: jwtConstant.ISSUER,
      };

      const decoded = jwt.verify(
        token,
        this.PUBLIC_KEY as string,
        verifyOptions,
      ) as JwtPayload;

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
