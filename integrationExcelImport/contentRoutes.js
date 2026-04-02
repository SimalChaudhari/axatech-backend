import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import {
  createIntegrationExcelImportContent,
  deleteIntegrationExcelImportContent,
  getIntegrationExcelImportContent,
  updateIntegrationExcelImportContent,
} from './integrationExcelImportContentController.js';

const router = express.Router();

router.get('/', getIntegrationExcelImportContent);
router.post('/', protect, admin, createIntegrationExcelImportContent);
router.put('/', protect, admin, updateIntegrationExcelImportContent);
router.delete('/', protect, admin, deleteIntegrationExcelImportContent);

export default router;

