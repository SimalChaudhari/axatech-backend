import express from 'express';
import { getHomeContent, updateHomeContent } from './homeController.js';
import { protect, admin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getHomeContent);
router.put('/', protect, admin, updateHomeContent);

export default router;
