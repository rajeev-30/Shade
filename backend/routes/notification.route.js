import express from 'express';
import isAuthenticated from '../db/auth.js';
import { getNotifications } from '../controllers/notification.controller.js';
const router = express.Router();

router.route('/notifications').get(isAuthenticated, getNotifications);

export default router;