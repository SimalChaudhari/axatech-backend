import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
  createTallyBusinessSolutionsContent,
  deleteTallyBusinessSolutionsContent,
  getTallyBusinessSolutionsContent,
  updateTallyBusinessSolutionsContent,
} from './tallyBusinessSolutionsContentController.js';

const router = express.Router();

router.get('/', getTallyBusinessSolutionsContent);
router.post('/', protect, admin, createTallyBusinessSolutionsContent);
router.put('/', protect, admin, updateTallyBusinessSolutionsContent);
router.delete('/', protect, admin, deleteTallyBusinessSolutionsContent);

export default router;

