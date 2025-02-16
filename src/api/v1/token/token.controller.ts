import { Request, Response } from 'express';
import SendResponse from '../../../utils/SendResponse';
import tokenService from './token.service';

class Token_Controller {
  async createToken(req: Request, res: Response) {
    try {
      const { userID, expiry } = req.body;

      let Create_Token = await tokenService.createToken(userID, expiry);

      SendResponse.success(
        res,
        201,
        'Token created successfully',
        Create_Token,
      );
    } catch (error: any) {
      SendResponse.error(res, 400, error.message);
    }
  }

  async deleteToken(req: Request, res: Response) {}
}

export default new Token_Controller();
