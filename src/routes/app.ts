import cors from 'cors';
import express from 'express';
const app = express();

import cookieParser from 'cookie-parser';
import { EmailRouter } from '../api/v1/email/email.routes';
import { AuthRoutes } from '../api/v1/Auth/Auth.routes';
import { TechnologyRoutes } from '../api/v1/Technology/technology.routes';
import { ContactRouter } from '../api/v1/Contact/Contact.routes';
import { ProjectRouter } from '../api/v1/Project/Project.routes';
import { Token_Router } from '../api/v1/token/token.routes';
import env_constant from '../constant/env.constant';
import { CallBack_Router } from '../api/v1/CallBack/CallBack.routes';

app.use(
  cors({
    origin: env_constant.FRONTEND_ORIGIN,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 3600,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(
  '/api',
  AuthRoutes,
  TechnologyRoutes,
  EmailRouter,
  ContactRouter,
  ProjectRouter,
  Token_Router,
  CallBack_Router,
);

export default app;
