import bcrypt from 'bcryptjs';
import AuthConstant from './Auth.constant';
import { Schema, model } from 'mongoose';
import { IAuth } from './Auth.type';
import JwtUtils from '../../../utils/Jwt.utils';

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
      type: Schema.Types.ObjectId,
      ref: 'Technology',
    },
  ],

  role: {
    type: String,
    default: 'Admin',
    required: [true, 'Role is required'],
  },

  approved: {
    type: Boolean,
    default: false,
    required: true,
  },

  refreshToken: {
    type: String,
    default: '',
  },
});

// Exclude refreshToken when converting to JSON

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
