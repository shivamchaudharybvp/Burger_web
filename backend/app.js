import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnection } from "./database/db.js";
import { errorMiddleware } from "./error/error.js";
import reservationRouter from './routes/res.js'; // Ensure path is correct

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1/reservation', reservationRouter); // Ensure this path matches your API calls

dbConnection();
app.use(errorMiddleware);

export default app;