import { Response } from 'express';

class SendResponse {
  static success(
    res: Response,
    statusCode: number,
    message: string,
    data: unknown,
  ) {
    return res.status(statusCode).json({
      message,
      data,
    });
  }

  static error(res: Response, statusCode: number, message: string) {
    return res.status(statusCode).json({
      message,
      error: true,
    });
  }
}

export default SendResponse;
