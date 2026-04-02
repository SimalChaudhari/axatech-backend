import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import tdlInvoiceContentController from './tdlInvoiceContentController.js';

const router = express.Router();

router.get('/', tdlInvoiceContentController.get);
router.post('/', protect, admin, tdlInvoiceContentController.create);
router.put('/', protect, admin, tdlInvoiceContentController.update);
router.delete('/', protect, admin, tdlInvoiceContentController.remove);

export default router;

