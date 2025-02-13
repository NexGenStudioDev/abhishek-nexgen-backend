import envConstant from 'constant/env.constant';
import { string } from 'joi';
import mongoose from 'mongoose';



let DbConnect = async () => {
  try {
    await mongoose.connect(envConstant.DB_URL as string);

    mongoose.connection.on('connected', () => {
      return console.log('Database connected successfully');
    });

    mongoose.connection.on('disconnected', () => {
      return console.log('Database disconnected');
    });

    mongoose.connection.on('error', (error) => {
      throw new Error(error);
    });

    console.log('Database connected successfully');
  } catch (error) {
    console.log('Database connection failed');
    console.log(error);
  }
};

export default DbConnect;