import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import tdlProductivityContentController from './tdlProductivityContentController.js';

const router = express.Router();

router.get('/', tdlProductivityContentController.get);
router.post('/', protect, admin, tdlProductivityContentController.create);
router.put('/', protect, admin, tdlProductivityContentController.update);
router.delete('/', protect, admin, tdlProductivityContentController.remove);

export default router;

