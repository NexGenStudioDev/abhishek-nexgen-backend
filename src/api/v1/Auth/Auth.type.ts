import { ITechnology } from '../Technology/technology.type';

export interface IAuth {
  name: string;
  email: string;
  password: string;
  approved: boolean;
  refreshToken: string;
  Technology_tools: ITechnology[];
  role: string;
  hashPassword(password: string): Promise<string>;
  comparePassword(hashPassword: string, password: string): Promise<boolean>;
}

export interface IAuthRefreshToken {
  userId: string;
  refreshToken: string;
}

export type AuthConstants = {
  CREATED: string;
  CREATED_FAILED: string;
  LOGIN_FAILED: string;
  FETCHED: string;
  FETCH_FAILED: string;
  FAIL_TO_DECRYPT_TOKEN: string;
  FAIL_TO_UPDATE_REFRESH_TOKEN: string;
  TOKEN_EXPIRED: string;
  INVALID_TOKEN: string;
  FAIL_TO_ENCREPT_EMAIL: string;
  EMAIL_REQUIRED: string;
  USER_ID_REQUIRED: string;
  UPDATE: string;
  NOT_APPROVED: string;
  FAIL_TO_FIND_USER: string;
  LOGIN_SUCCESS: string;
  NOT_SUPER_ADMIN: string;
  INCORECT_PASSWORD: string;
  UPDATE_FAILED: string;
  SALT_ROUNDS: number;
};
