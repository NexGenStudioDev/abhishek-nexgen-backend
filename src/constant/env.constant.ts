import { config } from 'dotenv';

config();

interface EnvConstants {
  PORT: number;
  DB_URL: string | undefined;
  JWT_SECRET?: string;
  bcryptSalt?: string;
  Base_url?: string;
  YOUR_EMAIL?: string;
  YOUR_EMAIL_PASSWORD?: string;
}

const env_constant: EnvConstants = {
  PORT: Number(process.env.PORT) || 8000,
  DB_URL: process.env.DB_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  Base_url: process.env.Base_url,
  YOUR_EMAIL: process.env.YOUR_EMAIL,
  YOUR_EMAIL_PASSWORD: process.env.YOUR_EMAIL_PASSWORD,
  bcryptSalt: process.env.bcryptSalt,
};

export default env_constant;
