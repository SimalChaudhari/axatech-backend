import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import tdlBusinessSpecificContentController from './tdlBusinessSpecificContentController.js';

const router = express.Router();

router.get('/', tdlBusinessSpecificContentController.get);
router.post('/', protect, admin, tdlBusinessSpecificContentController.create);
router.put('/', protect, admin, tdlBusinessSpecificContentController.update);
router.delete('/', protect, admin, tdlBusinessSpecificContentController.remove);

export default router;

