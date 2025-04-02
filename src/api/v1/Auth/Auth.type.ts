import { ITechnology } from '../Technology/technology.type';

export interface IAuth {
  name: string;
  email: string;
  password: string;
  approved: boolean;
  refreshToken?: string;
  Technology_tools: ITechnology[];
  role: string;
  hashPassword(password: string): Promise<string>;
  comparePassword(hashPassword: string, password: string): Promise<boolean>;
}
