import { Request, Response } from 'express';
import MailService from './email.service';
import SendResponse from '../../../utils/SendResponse';
import StatusConstant from '../../../constant/Status.constant';

class Mail_Controller {
  public sendMail = async (req: Request, res: Response) => {
    try {
      let { email, subject, message } = req.body;

      let send_Mail = await MailService.sendMail(email, subject, message);

      SendResponse.success(
        res,
        StatusConstant.OK,
        'Mail sent successfully',
        send_Mail,
      );
    } catch (error: any) {
      SendResponse.error(
        res,
        StatusConstant.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  };

  public forgotPassword = async (req: Request, res: Response) => {};
}

export default new Mail_Controller();
