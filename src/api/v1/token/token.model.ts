import { model, Schema } from 'mongoose';
import { IToken } from './token.type';
import AuthDal from '../Auth/Auth.dal';
import { console } from 'inspector';

const tokenSchema = new Schema<IToken>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'Auth',
      required: true,
    },

    accessToken: {
      type: String,
      required: true,
    },

    refreshToken: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    isUsed: {
      type: Boolean,
      default: false,
    },
    requestAttempts: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

tokenSchema.pre('save', async function (next) {
  try {
    console.log('this', this);

    await AuthDal.updateRefreshToken({
      refreshToken: this.refreshToken,
      userId: String(this.userId),
    });

    next();
  } catch (error: any) {
    next(error);
  }
});

const Token = model('Token', tokenSchema);
export default Token;
