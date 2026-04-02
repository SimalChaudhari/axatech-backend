import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
  createIntegrationThirdPartyContent,
  deleteIntegrationThirdPartyContent,
  getIntegrationThirdPartyContent,
  updateIntegrationThirdPartyContent,
} from './integrationThirdPartyContentController.js';

const router = express.Router();

router.get('/', getIntegrationThirdPartyContent);
router.post('/', protect, admin, createIntegrationThirdPartyContent);
router.put('/', protect, admin, updateIntegrationThirdPartyContent);
router.delete('/', protect, admin, deleteIntegrationThirdPartyContent);

export default router;

