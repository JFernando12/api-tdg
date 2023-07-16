import express from 'express';
import 'express-async-errors';
import { NotFoundError } from './errors';
import { errorHandler } from './middlewares';
import { authRouter } from './routes/authRoute';
import morgan from 'morgan';
import cors from 'cors';
import { productRouter } from './routes/productRoute';
import { ENV } from './config/envs';

const app = express();
app.use(
  cors({
    credentials: true,
    origin:
      ENV === 'development'
        ? 'http://localhost:5000'
        : 'https://app.thedreamgiftmx.com',
  })
);

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/auth', authRouter);
app.use('/products', productRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
