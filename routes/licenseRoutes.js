import express from 'express';
import { getPlans, createPlan, updatePlan, deletePlan } from '../controllers/licenseController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPlans);
router.post('/', protect, admin, createPlan);
router.put('/:id', protect, admin, updatePlan);
router.delete('/:id', protect, admin, deletePlan);

export default router;
