import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import keysRouter from './routes/keys.js';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';
import logger from './middlewares/logger.js';
import errorHandler from './middlewares/errorHandler.js';

// Config
dotenv.config();
const app = express();
const PORT = process.env.PORT;
mongoose.connect(process.env.CONNECTION_STRING);
const database = mongoose.connection;

// Middlewares
app.use(express.json());
app.use(logger);

// Routes
app.use('/api/keys', keysRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

// DB EmitEvents
database.on('error', (error) => console.log(error));
database.once('connected', () => {
    console.log('DB Connected');
    // Start server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});

// ErrorHandling
app.use(errorHandler);