import express from 'express';
import isAuthenticated from '../db/auth.js';
import { deleteNotification, deleteNotifications, getNotifications } from '../controllers/notification.controller.js';
const router = express.Router();

router.route('/notifications').get(isAuthenticated, getNotifications);
router.route('/deletenotifications').delete(isAuthenticated, deleteNotifications)
router.route('/deletenotification/:id').delete(isAuthenticated, deleteNotification)

export default router;