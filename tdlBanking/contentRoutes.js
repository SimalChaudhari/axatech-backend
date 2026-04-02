import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import tdlBankingContentController from './tdlBankingContentController.js';

const router = express.Router();

router.get('/', tdlBankingContentController.get);
router.post('/', protect, admin, tdlBankingContentController.create);
router.put('/', protect, admin, tdlBankingContentController.update);
router.delete('/', protect, admin, tdlBankingContentController.remove);

export default router;

