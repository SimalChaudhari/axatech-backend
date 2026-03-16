import express from 'express';
import { createEnquiry, getEnquiries, getEnquiryById, updateEnquiryStatus } from './enquiryController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createEnquiry);
router.get('/', protect, admin, getEnquiries);
router.get('/:id', protect, admin, getEnquiryById);
router.put('/:id/status', protect, admin, updateEnquiryStatus);

export default router;
