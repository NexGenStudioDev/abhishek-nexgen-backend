import app from "routes/app";




import DbConnect from "config/dbConnect";
import envConstant from "constant/env.constant";



app.listen(envConstant.PORT, async () => {
    try {
      console.log(`Server is running on port ${envConstant.PORT}`);
      await DbConnect();
    } catch (error) {
      console.log(error);
      console.log('Server failed to start');
    }
});