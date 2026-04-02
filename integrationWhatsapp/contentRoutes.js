import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
  createIntegrationWhatsappContent,
  deleteIntegrationWhatsappContent,
  getIntegrationWhatsappContent,
  updateIntegrationWhatsappContent,
} from './integrationWhatsappContentController.js';

const router = express.Router();

router.get('/', getIntegrationWhatsappContent);
router.post('/', protect, admin, createIntegrationWhatsappContent);
router.put('/', protect, admin, updateIntegrationWhatsappContent);
router.delete('/', protect, admin, deleteIntegrationWhatsappContent);

export default router;

