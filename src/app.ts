import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Application routes
app.use('/api', router);

const test = (req: Request, res: Response) => {
  res.send(`Welcome to Bike rental service Server`);
};
app.get('/', test);

export default app;