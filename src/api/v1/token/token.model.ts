import { Schema, model } from 'mongoose';

interface IAuth extends Document {
  user: Schema.Types.ObjectId;
  token: string;
  expiry: Date;
}

let Token_Schema = new Schema<IAuth>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Auth',
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiry: {
    type: Date,
    required: true,
  },
});

export default model<IAuth>('Token', Token_Schema);
