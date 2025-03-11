import { ObjectId } from 'mongoose';
import { Document } from 'mongoose';

export interface ITechnology extends Document {
  _id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}
