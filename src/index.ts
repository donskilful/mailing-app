import express, { Application, NextFunction, Request, Response } from 'express';
import 'dotenv/config';
import log from './logger';
import morgan from 'morgan';
import fs from 'fs';
import path from 'path';
import mailTestingRouter from './routes/mailTestingRouter';

const app: Application = express();

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {
    flags: 'a',
  },
);

morgan.token('type', function (req: Request, res: Response) {
  return req.headers['content-type'];
});

app.use(morgan('combined', { stream: accessLogStream }));

app.use(express.json());
app.use((req: Request, res: Response, next: Function) => {
  next();
});

app.get('/api/v1', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to mailing-app APIs',
    data: ['💌'],
  });
});

app.use('/api/v1/mail', mailTestingRouter);

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  console.log(req.url);
  res.status(404).json({
    status: 'fail',
    message: `Endpoint ${req.originalUrl} not found`,
    error: [`Can't find ${req.originalUrl} on this server`],
  });
});

const PORT = process.env.PORT || 2000;

app.listen(PORT, () => log.info(`mailing-app server Running on port ${PORT}`));
