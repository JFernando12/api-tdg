import { Request, Response, Router } from 'express';
import { body } from 'express-validator';
import { validateRequest, requireAuth } from '../middlewares';
import authController from '../controllers/authController';

const router = Router();

router.post('/products');

export { router as authRouter };
