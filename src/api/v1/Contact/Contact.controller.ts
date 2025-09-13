import { Request, Response } from 'express';
import SendResponse from '../../../utils/SendResponse';
import StatusConstant from '../../../constant/Status.constant';
import ContactService from './Contact.service';
import ContactConstant from './Contact.constant';
import exp from 'constants';
import AuthDal from '../Auth/Auth.dal';
import JwtUtils from '../../../utils/Jwt.utils';
import AuthConstant from '../Auth/Auth.constant';

class Contact_Controller {
  public create = async (req: Request, res: Response) => {
    try {
      const { name, email, phone, message } = req.body;

      let Created_Contact = await ContactService.create({
        name,
        email,
        phone,
        message,
      });

      SendResponse.success(
        res,
        StatusConstant.CREATED,
        ContactConstant.CONTACT_CREATED,
        Created_Contact,
      );
    } catch (error: any) {
      SendResponse.error(res, StatusConstant.BAD_REQUEST, error.message);
    }
  };

  public find = async (req: Request, res: Response) => {
    try {
      const token = req.cookies['refresh-token'] || req.headers.authorization;

      if (!token) {
        throw new Error(AuthConstant.INVALID_TOKEN);
      }

      let Decode_Token = await JwtUtils.verifyJWT_TOKEN(token, 'access');

      let user = await AuthDal.FIND_BY_USER_ID(Decode_Token.userId);
      const userId = String(user._id);

      let Contact = await ContactService.find_Contact_Data(userId);
      SendResponse.success(
        res,
        StatusConstant.OK,
        ContactConstant.FETCHED,
        Contact,
      );
    } catch (error: any) {
      SendResponse.error(res, StatusConstant.BAD_REQUEST, error.message);
    }
  };
}

export default new Contact_Controller();
