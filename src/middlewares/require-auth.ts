import { NextFunction, Request, Response } from 'express';
import Jwt from 'jsonwebtoken';
import { NotAuthorizedError } from '../errors';

interface UserPayload {
  email: string;
  id: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    return next();
  }

  const token = req.headers.authorization.split(' ')[1];

  try {
    const payload = Jwt.verify(token, process.env.JWT_KEY!) as UserPayload;
    req.currentUser = payload;
    next();
  } catch (error) {
    throw new NotAuthorizedError();
  }
};
