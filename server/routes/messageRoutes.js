import express from 'express';
import { createMessage, getMessages } from '../controllers/messageController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Define routes for /api/messages
router.post('/', createMessage);                // Add a new message (Public)
router.get('/', protectAdmin, getMessages);    // Retrieve all messages (Protected)

export default router;

