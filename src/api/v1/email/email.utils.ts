import nodemailer from 'nodemailer';
import env_constant from '../../../constant/env.constant';

class EmailUtils {
  public Mail_transporter = async () => {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: env_constant.YOUR_EMAIL,
        pass: env_constant.YOUR_EMAIL_PASSWORD,
      },
    });

    return transporter;
  };
}

export default new EmailUtils();
