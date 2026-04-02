import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
  createDedicatedVpsServerContent,
  deleteDedicatedVpsServerContent,
  getDedicatedVpsServerContent,
  updateDedicatedVpsServerContent,
} from './dedicatedVpsServerContentController.js';

const router = express.Router();

router.get('/', getDedicatedVpsServerContent);
router.post('/', protect, admin, createDedicatedVpsServerContent);
router.put('/', protect, admin, updateDedicatedVpsServerContent);
router.delete('/', protect, admin, deleteDedicatedVpsServerContent);

export default router;

