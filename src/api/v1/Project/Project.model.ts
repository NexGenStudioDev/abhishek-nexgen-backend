import { model, Schema, Types } from 'mongoose';
import { Project_Type } from './Project.type';

let Project_Schema = new Schema<Project_Type>({
  User_id: {
    type: Types.ObjectId,
    ref: 'Auth',
    required: [true, 'User is required'],
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
  },
  features: [
    {
      type: String,
      required: [true, 'Features is required'],
    },
  ],
  bg_color: {
    type: String,
    required: [true, 'Background color is required'],
  },
  techStack: [
    {
      type: String,
      required: [true, 'TechStack is required'],
    },
  ],
  links: [
    {
      label: {
        type: String,
        required: [true, 'Label is required'],
      },
      link: {
        type: String,
        required: [true, 'Link is required'],
      },
    },
  ],
  video: {
    type: String,
    required: [true, 'Video is required'],
  },
});

let Project_Model = model<Project_Type>('Project', Project_Schema);
export default Project_Model;
