import { CallBack_Schema_Type } from './CallBack.type';
import { Schema, model } from 'mongoose';

let CallBack_Schema = new Schema<CallBack_Schema_Type>(
  {
    Name: {
      type: String,
      required: true,
    },
    Phone: {
      type: String,
      required: true,
    },
    Date: {
      type: Date,
      required: true,
    },

    Status: {
      type: String,
      enum: ['Pending', 'Completed'],
      default: 'Pending',
      required: true,
    },

    Time: {
      Hours: {
        type: String,
        required: true,
      },
      Minutes: {
        type: String,
        required: true,
      },
      Meridiem: {
        type: String,
        enum: ['AM', 'PM'],
        required: true,
      },
    },
  },
  { timestamps: true },
);

export const CallBack_Model = model<CallBack_Schema_Type>(
  'CallBack',
  CallBack_Schema,
);
