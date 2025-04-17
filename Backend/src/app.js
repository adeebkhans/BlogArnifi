// app.js - Main express app setup
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import routes from './routes/index.js';
import { errorHandler } from './middleware/error.middleware.js';

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

export default app;
