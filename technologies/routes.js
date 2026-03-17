import express from 'express';
import {
  getTechnologies,
  getTechnologyById,
  getTechnologyBySlug,
  createTechnology,
  updateTechnology,
  deleteTechnology,
} from './technologyController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTechnologies);
router.get('/:slug', getTechnologyBySlug);
router.get('/:id', getTechnologyById);
router.post('/', protect, admin, createTechnology);
router.put('/:id', protect, admin, updateTechnology);
router.delete('/:id', protect, admin, deleteTechnology);

export default router;
