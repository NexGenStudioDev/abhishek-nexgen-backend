import env_constant from '../../../constant/env.constant';
import Mail_Constant from './email.constant';
import emailUtils from './email.utils';
import { Send_Mail_Validator } from './email.validator';

class Mail_Service {
  public forgotPassword = async (email: string) => {
    const subject = 'Password Reset';
    const message =
      'Please use the following link to reset your password: <reset_link>';
    await this.sendMail(email, subject, message);
  };

  public sendMail = async (email: string, subject: string, message: string) => {
    try {
      let { error } = Send_Mail_Validator.validate({ email, subject, message });

      if (error) {
        throw new Error(
          error.details.map((detail) => detail.message).join(', '),
        );
      }

      let send_Mail = (await emailUtils.Mail_transporter()).sendMail({
        from: env_constant.YOUR_EMAIL,
        to: email,
        subject: subject,
        text: message,
      });

      console.log('Message sent: %s', send_Mail);

     return send_Mail;
    } catch (error: any) {
      throw Error(error.message || Mail_Constant.MAIL_SENT_FAILED);
    }
  };
}

export default new Mail_Service();
