import { Request, Response } from 'express';
import SendResponse from '../../../utils/SendResponse';
import StatusConstant from '../../../constant/Status.constant';
import ContactService from './Contact.service';
import ContactConstant from './Contact.constant';
import exp from 'constants';
import AuthDal from '../Auth/Auth.dal';
import JwtUtils from '../../../utils/Jwt.utils';

class Contact_Controller {
  public create = async (req: Request, res: Response) => {
    try {
      const { name, email, phone, message } = req.body;
      const token = req.cookies.token || req.headers.authorization;

      if (!token) {
        throw new Error('Token is required');
      }

      let decoded = await JwtUtils.verifyJWT_TOKEN(token, 'access');

      let user = await AuthDal.FIND_byEmail(decoded.email);
      let userId = String(user._id);

      let Created_Contact = await ContactService.create({
        name,
        email,
        phone,
        message,
        userId,
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
      const token = req.cookies.token || req.headers.authorization;

      if (!token) {
        throw new Error('Token is required');
      }

      let decoded = await JwtUtils.verifyJWT_TOKEN(token, 'access');



      // let user = await AuthDal.FIND_byEmail(decoded.email);
      // let userId = String(user._id);

      // let Contact = await ContactService.find_Contact_Data(userId);
      // SendResponse.success(
      //   res,
      //   StatusConstant.OK,
      //   ContactConstant.FETCHED,
      //   Contact,
      // );
    } catch (error: any) {
      SendResponse.error(res, StatusConstant.BAD_REQUEST, error.message);
    }
  };
}

export default new Contact_Controller();
