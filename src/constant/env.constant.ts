import { config } from 'dotenv';


config();


interface EnvConstants {
  PORT: number;
  DB_URL: string | undefined;
  bcryptSalt?: string;
  Base_url?: string;
}


const env_constant: EnvConstants = {
  PORT: process.env.PORT ? Number(process.env.PORT) : 8000,
  DB_URL: process.env.DB_URL, 
  Base_url: process.env.Base_url,
  bcryptSalt: process.env.bcryptSalt,
};


export default Object.freeze(env_constant);
