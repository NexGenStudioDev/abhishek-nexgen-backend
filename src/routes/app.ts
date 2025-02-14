import express from 'express';
import { AuthRoutes } from '../api/v1/Auth/Auth.routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', AuthRoutes);

export default app;
