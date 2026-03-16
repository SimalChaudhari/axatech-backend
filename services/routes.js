import express from 'express';
import { getServices, getServiceBySlug, createService, updateService, deleteService } from './serviceController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getServices);
router.get('/:slug', getServiceBySlug);
router.post('/', protect, admin, createService);
router.put('/:id', protect, admin, updateService);
router.delete('/:id', protect, admin, deleteService);

export default router;
