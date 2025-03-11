import { Schema, model, Document } from 'mongoose';
import { ITechnology } from './technology.type';

const TechnologySchema = new Schema<ITechnology>(
  {
    name: { type: String, required: [true, 'name is required'], unique: true },
    description: { type: String, required: [true, 'description is required'] },
    image: { type: String, required: [true, 'image url is required'] },
    link: { type: String, required: [true, 'link url is requiured'] },
  },
  {
    timestamps: true,
  },
);

const Technology = model<ITechnology>('Technology', TechnologySchema);

export default Technology;
