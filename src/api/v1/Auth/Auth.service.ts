
import { createAuth_Validator} from './Auth.validator';



import bcrypt from 'bcrypt-nodejs'; // Assuming you use bcrypt for hashing
import jwt from 'jsonwebtoken'; 

import AuthConstant from './Auth.constant';
import AuthModel from './Auth.model';



export let Auth_Service = {
  signUp: async ({ name, email, hashPassword, role }: { name: string; email: string; hashPassword: string; role: string }) => {
    try {

      const { error } = createAuth_Validator.validate({ name, email, hashPassword, role });

      if (error) {
        throw new Error(error.details.map((detail) => detail.message).join(', '));
      }

 
      const Auth_User = await AuthModel.create({
        name,
        email,
        password: hashPassword,
        role,
      });

      if (!Auth_User) {
        throw new Error(AuthConstant.CREATED_FAILED);
      }

      return Auth_User;
    } catch (error: any) {
      if (error.isJoi) {
        throw new Error(`Validation failed: ${error.details.map((detail: any) => detail.message).join(', ')}`);
      }

      throw new Error(error.message || 'An unexpected error occurred');
    }
  },

  signIn: async ({ email, password }: { email: string; password: string }) => {
    try {
     
    } catch (error: any) {

      throw new Error(error.message || 'An unexpected error occurred');
    }
  },
};
