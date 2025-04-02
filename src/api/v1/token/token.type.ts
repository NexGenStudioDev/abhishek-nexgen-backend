import { Document, ObjectId } from 'mongoose';

// Interface for Token document
export interface IToken extends Document {
  userId: ObjectId | string; // The user ID to whom the token belongs
  accessToken: string; // The JWT access token
  refreshToken: string; // The JWT refresh token
  createdAt?: Date; // The date when the token was created
  updatedAt?: Date; // The date when the token was last updated
}
