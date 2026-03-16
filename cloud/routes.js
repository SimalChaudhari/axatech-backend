import express from 'express';
import { getCloudPlans, createCloudPlan, updateCloudPlan, deleteCloudPlan } from './cloudController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getCloudPlans);
router.post('/', protect, admin, createCloudPlan);
router.put('/:id', protect, admin, updateCloudPlan);
router.delete('/:id', protect, admin, deleteCloudPlan);

export default router;
