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

// Enable CORS and allow cookies
app.use(
  cors({
    origin: ["http://localhost:5173", "blog-arnifi-backend.vercel.app"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

app.use('/api', routes);

app.use(errorHandler);

export default app;
