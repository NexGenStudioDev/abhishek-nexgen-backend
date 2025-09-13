import { model, Schema, Document, ObjectId } from 'mongoose';

interface Contact_Type extends Document {
  userId: ObjectId;
  name: string;
  email: string;
  phone: number;
  message: string;
}

let Contact_Schema = new Schema<Contact_Type>({
  name: {
    type: String,
    required: [true, 'Name is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  phone: {
    type: Number,
    Min: [10, 'Phone number should be 10 digits'],
    Max: [10, 'Phone number should be 10 digits'],
    required: [true, 'Phone is required'],
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
  },
});

let ContactModel = model<Contact_Type>('Contact', Contact_Schema);
export default ContactModel;
