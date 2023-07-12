import mongoose from 'mongoose';
import { app } from './app';
import {
  MONGO_URI,
  PORT,
  ROOT_ID,
  ROOT_EMAIL,
  ROOT_PASSWORD,
  ROOT_USERNAME,
} from './config/envs';

if (!MONGO_URI) {
  throw new Error('MONGO_URI must be defined');
}

if (!ROOT_ID) {
  throw new Error('ROOT_ID must be defined');
}

if (!ROOT_USERNAME) {
  throw new Error('ROOT_USERNAME must be defined');
}

if (!ROOT_EMAIL) {
  throw new Error('ROOT_EMAIL must be defined');
}

if (!ROOT_PASSWORD) {
  throw new Error('ROOT_PASSWORD must be defined');
}

mongoose.connect(MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log('Server on port: ', PORT);
});
