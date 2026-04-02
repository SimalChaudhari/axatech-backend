import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import tdlMisReportingContentController from './tdlMisReportingContentController.js';

const router = express.Router();

router.get('/', tdlMisReportingContentController.get);
router.post('/', protect, admin, tdlMisReportingContentController.create);
router.put('/', protect, admin, tdlMisReportingContentController.update);
router.delete('/', protect, admin, tdlMisReportingContentController.remove);

export default router;

