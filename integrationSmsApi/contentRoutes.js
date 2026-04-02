import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
  createIntegrationSmsApiContent,
  deleteIntegrationSmsApiContent,
  getIntegrationSmsApiContent,
  updateIntegrationSmsApiContent,
} from './integrationSmsApiContentController.js';

const router = express.Router();

router.get('/', getIntegrationSmsApiContent);
router.post('/', protect, admin, createIntegrationSmsApiContent);
router.put('/', protect, admin, updateIntegrationSmsApiContent);
router.delete('/', protect, admin, deleteIntegrationSmsApiContent);

export default router;

