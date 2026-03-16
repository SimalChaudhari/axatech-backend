import express from 'express';
import { getProjects, getProjectBySlug, createProject, updateProject, deleteProject, deleteProjectsBulk } from './projectController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProjects);
router.post('/bulk-delete', protect, admin, deleteProjectsBulk);
router.get('/:slug', getProjectBySlug);
router.post('/', protect, admin, createProject);
router.put('/:id', protect, admin, updateProject);
router.delete('/:id', protect, admin, deleteProject);

export default router;

