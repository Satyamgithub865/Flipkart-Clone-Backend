import express from 'express'
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import Connection from './database/db.js';
import { defaultData } from './controller/product-controller.js';
import Router from './routes/Route.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', Router)

const URL = process.env.DB_URL;
Connection(URL);

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running successfully on port ${PORT}`));

defaultData();