import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest, requireAuth } from '../middlewares';
import authController from '../controllers/authController';

const router = Router();

router.post(
  '/signup',
  [
    body('username').isEmail().withMessage('Username must be valid'),
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  authController.signup
);

router.post(
  '/signin',
  [
    body('username', 'username or email is required')
      .if(body('email').not().isEmail())
      .notEmpty(),
    body('password').notEmpty().withMessage('password is required'),
  ],
  validateRequest,
  authController.signin
);

router.get('/currentuser', requireAuth, authController.currentUser);

export { router as authRouter };
