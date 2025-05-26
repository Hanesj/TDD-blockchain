import express from 'express';
import dotenv from 'dotenv';

import { blockRouter } from './routes/blockchain-routes.mjs';

dotenv.config({ path: './config/config.env' });

const app = express();

app.use(express.json());

export { app };
