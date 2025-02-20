import cookieParser from 'cookie-parser';
import express from 'express';
const app = express();
import { AuthRoutes } from '../api/v1/Auth/Auth.routes';

import { TechnologyRoutes } from '../api/v1/Technology/technology.routes';



app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', AuthRoutes, TechnologyRoutes);


export default app;
