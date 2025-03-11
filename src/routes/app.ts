import express from 'express';
const app = express();
import cors from 'cors';

import cookieParser from 'cookie-parser';
import { EmailRouter } from '../api/v1/email/email.routes';
import { AuthRoutes } from '../api/v1/Auth/Auth.routes';
import { TechnologyRoutes } from '../api/v1/Technology/technology.routes';
import { ContactRouter } from '../api/v1/Contact/Contact.routes';

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Type', 'Authorization'],
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 3600,
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', AuthRoutes, TechnologyRoutes, EmailRouter, ContactRouter);

export default app;
