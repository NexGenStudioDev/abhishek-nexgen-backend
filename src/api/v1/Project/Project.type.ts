import { ObjectId } from 'mongoose';

export type Link_type = {
  lable: string;
  link: string;
};

export interface Project_Type {
  _id: number;
  User_id: ObjectId;
  title: string;
  description: string;
  features: string[];
  bg_color: string;
  techStack: string[];
  links: Link_type[];
  video: string;
}
