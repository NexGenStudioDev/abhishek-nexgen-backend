import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import envConstant from '../../../constant/env.constant';

interface IAuth extends Document {
  name: string;
  email: string;
  password: string;
  Technology_tools: Array<{
    name: string;
    description: string;
    image: string;
    link: string;
  }>;
  role: string;
  hashPassword(password: string): Promise<string>;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const AuthSchema = new Schema<IAuth>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },

  email: {
    type: String,
    required: true,
    unique: [true, 'Email already exists'],
    lowercase: true,
  },

  password: {
    type: String,
    min: [6, 'Password should have a minimum length of 6'],
    required: [true, 'Password is required'],
  },

  Technology_tools: [
    {
      name: {
        type: String,
        required: [true, 'Name is required'],
      },

      description: {
        type: String,
        required: [true, 'Description is required'],
      },

      image: {
        type: String,
        required: [true, 'Image is required'],
      },

      link: {
        type: String,
        required: [true, 'Link is required'],
      },
    },
  ],

  role: {
    type: String,
    default: 'Super Admin',
    required: [true, 'Role is required'],
  },
});

AuthSchema.methods.hashPassword = async function (
  password: string,
): Promise<string> {
  return bcrypt.hashSync(
    password,
    bcrypt.genSaltSync(Number(envConstant.bcryptSalt)),
  );
};

const AuthModel = model<IAuth>('Auth', AuthSchema);

export default AuthModel;
