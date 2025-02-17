import { Request, Response, NextFunction } from 'express';
import AuthDal from '../api/v1/Auth/Auth.dal';
import SendResponse from '../utils/SendResponse';
import AuthConstant from '../api/v1/Auth/Auth.constant';

class Auth_MiddleWate {
  public async Verify_Super_Admin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const token = req.cookies.token;

      if (!token) {
        throw new Error('Token is required');
      }

      const verify = await AuthDal.Verify_Token(token);

      const isSuper_Admin = await AuthDal.Check_Super_Admin(verify.email);

      if (!isSuper_Admin) {
        throw new Error(AuthConstant.NOT_SUPER_ADMIN);
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
