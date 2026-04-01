import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
  getTssPlans,
  createTssPlan,
  updateTssPlan,
  deleteTssPlan,
} from './tssController.js';

const router = express.Router();

router.get('/', getTssPlans);
router.post('/', protect, admin, createTssPlan);
router.put('/:id', protect, admin, updateTssPlan);
router.delete('/:id', protect, admin, deleteTssPlan);

export default router;

