import express from 'express';
const app = express();
import cookieParser from 'cookie-parser';
import { EmailRouter } from '../api/v1/email/email.routes';
import { AuthRoutes } from '../api/v1/Auth/Auth.routes';
import { TechnologyRoutes } from '../api/v1/Technology/technology.routes';
import { ContactRouter } from '../api/v1/Contact/Contact.routes';

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', AuthRoutes, TechnologyRoutes, EmailRouter, ContactRouter);

export default app;
