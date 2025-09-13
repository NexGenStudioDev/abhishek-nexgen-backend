import { Request, Response } from 'express';
import { RenewAccessToken_Validator } from './token.validation';
import SendResponse from '../../../utils/SendResponse';
import StatusConstant from '../../../constant/Status.constant';
import tokenUtils from './token.utils';
import tokenService from './token.service';
import { access } from 'fs';
import JwtUtils from '../../../utils/Jwt.utils';
import tokenConstant from './token.constant';

class Token_Controller {
  RenewAccessToken = async (req: Request, res: Response) => {
    try {
      const { refresh_token } = req.body;

      let { error } = RenewAccessToken_Validator.validate(req.body);

      if (error) {
        throw new Error(error.details.map((x) => x.message).join(', '));
      }

      let VerifyRefreshToken = await JwtUtils.verifyJWT_TOKEN(
        refresh_token,
        'access',
      );

      let userId = VerifyRefreshToken.userId;

      let GenerateAccessToken = await JwtUtils.generateAccessToken({ userId });

      let Updated_Access_Token = await tokenService.RenewAccessToken(
        refresh_token,
        GenerateAccessToken,
      );

      SendResponse.success(
        res,
        StatusConstant.OK,
        tokenConstant.ACCESS_TOKEN_UPDATED,
        Updated_Access_Token,
      );
    } catch (error: any) {
      SendResponse.error(
        res,
        StatusConstant.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  };

  RenewRefreshToken = async (req: Request, res: Response) => {};
}

export default new Token_Controller();
