import express from 'express';
import { getTssContent, updateTssContent } from './tssContentController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTssContent);
router.put('/', protect, admin, updateTssContent);

export default router;

