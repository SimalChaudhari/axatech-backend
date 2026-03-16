import express from 'express';
import { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct, deleteProductsBulk } from './productController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/bulk-delete', protect, admin, deleteProductsBulk);
router.get('/:slug', getProductBySlug);
router.post('/', protect, admin, createProduct);
router.put('/:id', protect, admin, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

export default router;
