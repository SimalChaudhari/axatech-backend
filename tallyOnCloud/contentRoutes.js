import express from 'express';
import {
  createTallyOnCloudContent,
  deleteTallyOnCloudContent,
  getTallyOnCloudContent,
  updateTallyOnCloudContent,
} from './tallyOnCloudContentController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTallyOnCloudContent);
router.post('/', protect, admin, createTallyOnCloudContent);
router.put('/', protect, admin, updateTallyOnCloudContent);
router.delete('/', protect, admin, deleteTallyOnCloudContent);

export default router;
