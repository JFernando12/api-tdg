import { config } from 'dotenv';

config();

export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI;
export const JWT_KEY = process.env.JWT_KEY;
export const ROOT_ID = process.env.ROOT_ID;
export const ROOT_USERNAME = process.env.ROOT_USERNAME;
export const ROOT_EMAIL = process.env.ROOT_EMAIL;
export const ROOT_PASSWORD = process.env.ROOT_PASSWORD!;
export const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID!;
export const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY!;
