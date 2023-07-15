import { Router } from 'express';
import { body } from 'express-validator';
import { validateRequest, requireAuth, uploadImage } from '../middlewares';
import productController from '../controllers/productController';

const router = Router();

router.post(
  '/',
  requireAuth,
  uploadImage(),
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('price').not().isEmpty().withMessage('Price is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
  ],
  validateRequest,
  productController.create
);

router.get('/', requireAuth, productController.getAll);

router.get('/:id', requireAuth, productController.getById);

router.put(
  '/image/:id',
  requireAuth,
  uploadImage(),
  productController.updateImage
);

router.put(
  '/:id',
  requireAuth,
  uploadImage(),
  [
    body('name').not().isEmpty().withMessage('Name is required'),
    body('price').not().isEmpty().withMessage('Price is required'),
    body('description').not().isEmpty().withMessage('Description is required'),
  ],
  validateRequest,
  productController.update
);

router.delete('/:id', requireAuth, productController.remove);

export { router as productRouter };
