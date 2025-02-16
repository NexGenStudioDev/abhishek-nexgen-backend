import { Schema, model, Document } from 'mongoose';

interface ITechnology extends Document {
  name: string;
  description: string;
  image: string;
  link: string;
  createdAt: Date;
  updatedAt: Date;
}

const TechnologySchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  },
);

const Technology = model<ITechnology>('Technology', TechnologySchema);

export default Technology;
