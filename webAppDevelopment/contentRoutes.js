import express from 'express';
import { protect, admin } from '../middleware/auth.js';
import webAppDevelopmentContentController from './webAppDevelopmentContentController.js';

const router = express.Router();

router.get('/', webAppDevelopmentContentController.get);
router.post('/', protect, admin, webAppDevelopmentContentController.create);
router.put('/', protect, admin, webAppDevelopmentContentController.update);
router.delete('/', protect, admin, webAppDevelopmentContentController.remove);

export default router;

