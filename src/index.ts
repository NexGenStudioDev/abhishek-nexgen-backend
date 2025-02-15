import app from './routes/app';

import envConstant from './constant/env.constant';
import DbConnect from './config/dbConnect';

app.listen(envConstant.PORT, async () => {
  try {
    console.log(`Server is running on port ${envConstant.PORT}`);
    await DbConnect();
  } catch (error) {
    console.log(error);
    console.log('Server failed to start');
  }
});
