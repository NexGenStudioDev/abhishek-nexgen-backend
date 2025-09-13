import CALLBACK_CONSTANT from './CallBack.constant';
import { CallBack_Model } from './CallBack.model';
import { CallBack_Schema_Type } from './CallBack.type';
class CallBack_Service {
  CREATE_CALLBACK = async (Data: CallBack_Schema_Type) => {
    try {
      let Create_CallBack = CallBack_Model.create({
        Name: Data.Name,
        Phone: Data.Phone,
        Date: Data.Date,
        Status: Data.Status,
        Time: {
          Hours: Data.Time.Hours,
          Minutes: Data.Time.Minutes,
          Meridiem: Data.Time.Meridiem,
        },
      });

      if (!Create_CallBack)
        throw new Error(CALLBACK_CONSTANT.NOT_CREATED_CALLBACK);

      return Create_CallBack;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
}

export default new CallBack_Service();
