import { Request, Response, NextFunction } from 'express';
import SendResponse from '../../../utils/SendResponse';
import CALLBACK_CONSTANT from './CallBack.constant';
import CallBackService from './CallBack.service';
import { Create_CallBack_Validator } from './CallBack.Validator';

class CallBack_Controller {
  CREATE_CALLBACK = async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate request body
      const validatedData = await Create_CallBack_Validator.validateAsync(
        req.body,
        {
          abortEarly: false,
        },
      );

      // Create callback
      const createdCallback = await CallBackService.CREATE_CALLBACK(req.body);

      if (!createdCallback) {
        throw new Error(CALLBACK_CONSTANT.NOT_CREATED_CALLBACK);
      }

      return SendResponse.success(
        res,
        201,
        CALLBACK_CONSTANT.CREATED_CALLBACK,
        createdCallback,
      );
    } catch (error: any) {
      if (error.name === 'ValidationError') {
        return SendResponse.error(res, 400, error.errors || error.message);
      }
      return SendResponse.error(res, 500, error.message);
    }
  };
}

export default new CallBack_Controller();
