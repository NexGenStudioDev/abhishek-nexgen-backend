import { Request, Response, NextFunction } from 'express';
import AuthDal from '../api/v1/Auth/Auth.dal';
import SendResponse from '../utils/SendResponse';
import AuthConstant from '../api/v1/Auth/Auth.constant';
import JwtUtils from '../utils/Jwt.utils';

class Auth_MiddleWate {
  public async Verify_Super_Admin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const token = req.cookies.token || req.headers.authorization;

      if (!token) {
        throw new Error('Token is required');
      }

      const verify = await JwtUtils.verifyJWT_TOKEN(token, 'access');

      const isApproved = await AuthDal.isApproved(verify.email);

      if (!isApproved) {
        throw new Error(AuthConstant.NOT_APPROVED);
      }

      next();
    } catch (error: unknown) {
      if (error instanceof Error) {
        SendResponse.error(res, 400, error.message);
      } else {
        SendResponse.error(res, 400, 'An unknown error occurred');
      }
    }
  }
}

export default new Auth_MiddleWate();
