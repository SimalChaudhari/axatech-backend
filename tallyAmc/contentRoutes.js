import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
  createTallyAmcContent,
  deleteTallyAmcContent,
  getTallyAmcContent,
  updateTallyAmcContent,
} from './tallyAmcContentController.js';

const router = express.Router();

router.get('/', getTallyAmcContent);
router.post('/', protect, admin, createTallyAmcContent);
router.put('/', protect, admin, updateTallyAmcContent);
router.delete('/', protect, admin, deleteTallyAmcContent);

export default router;

