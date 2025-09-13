import { CallBack_Model } from './CallBack.model';

class CallBack_Utils {
  FIND_ALL_CALLBACK = async (DATA_LIMIT: number, DATA_SKIP: number) => {
    return await CallBack_Model.find()
      .limit(DATA_LIMIT)
      .skip(DATA_SKIP)
      .sort({ createdAt: -1 });
  };

  FIND_CALLBACK_BY_ID = async (ID: string) => {
    return await CallBack_Model.findById(ID);
  };
}

export default new CallBack_Utils();
