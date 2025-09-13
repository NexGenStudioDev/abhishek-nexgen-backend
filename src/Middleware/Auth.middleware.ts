import { Request, Response, NextFunction } from 'express';
import AuthDal from '../api/v1/Auth/Auth.dal';
import SendResponse from '../utils/SendResponse';
import AuthConstant from '../api/v1/Auth/Auth.constant';
import JwtUtils from '../utils/Jwt.utils';

class Auth_MiddleWare {
  public verifyRole(requiredRole: string) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.cookies['refresh-token'] || req.headers.authorization;

        if (!token) {
          throw new Error('Token is required');
        }

        const verify = await JwtUtils.verifyJWT_TOKEN(token, 'access');

        const isApproved = await AuthDal.isApproved(verify.userId);

        if (!isApproved) {
          throw new Error(AuthConstant.NOT_APPROVED);
        }

        // Check user role
        if (!verify.role || verify.role !== requiredRole) {
          throw new Error('Unauthorized: Insufficient role');
        }

        next();
      } catch (error: unknown) {
        if (error instanceof Error) {
          SendResponse.error(res, 400, error.message);
        } else {
          SendResponse.error(res, 400, 'An unknown error occurred');
        }
      }
    };
  }
}

export default new Auth_MiddleWare();
