import { Response } from 'express';

class SendResponse {
  static success(
    res: Response,
    statusCode: number,
    message: string,
    data: any = null,
  ) {
    return res.status(statusCode).json({
      message,
      data,
    });
  }

  static error(
    res: Response,
    statusCode: number,
    message: string,
    error: any = null,
  ) {
    return res.status(statusCode).json({
      message,
      error,
    });
  }
}

export default SendResponse;
