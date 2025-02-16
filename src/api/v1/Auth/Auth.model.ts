import bcrypt from 'bcryptjs';
import AuthConstant from './Auth.constant';
import { Schema, model, Document } from 'mongoose';

interface IAuth extends Document {
  name: string;
  email: string;
  password: string;
  approved: boolean;
  Technology_tools: Array<{
    name: string;
    description: string;
    image: string;
    link: string;
  }>;
  role: string;
  hashPassword(password: string): Promise<string>;
  comparePassword(hashPassword: string, password: string): Promise<boolean>;
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

  approved: {
    type: Boolean,
    default: false,
    required: true,
  },
});

AuthSchema.methods.hashPassword = async function (password: string) {
  const salt = bcrypt.genSaltSync(AuthConstant.SALT_ROUNDS);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

AuthSchema.methods.comparePassword = async function (
  hashPassword: string,
  password: string,
) {
  return bcrypt.compare(hashPassword, password);
};

const AuthModel = model<IAuth>('Auth', AuthSchema);

export default AuthModel;
