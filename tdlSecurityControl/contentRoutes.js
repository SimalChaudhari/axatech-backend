import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
  createTdlSecurityControlContent,
  deleteTdlSecurityControlContent,
  getTdlSecurityControlContent,
  updateTdlSecurityControlContent,
} from './tdlSecurityControlContentController.js';

const router = express.Router();

router.get('/', getTdlSecurityControlContent);
router.post('/', protect, admin, createTdlSecurityControlContent);
router.put('/', protect, admin, updateTdlSecurityControlContent);
router.delete('/', protect, admin, deleteTdlSecurityControlContent);

export default router;

