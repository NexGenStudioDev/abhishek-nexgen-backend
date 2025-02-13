
import express from "express";
const app = express();
import { AuthRoutes } from "api/v1/Auth/Auth.routes";
import envConstant from "constant/env.constant";


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api', AuthRoutes);

export default app;