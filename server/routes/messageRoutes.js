import express from 'express';
import { createMessage, getMessages, deleteMessage } from '../controllers/messageController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Define routes for /api/messages
router.post('/', createMessage);                // Add a new message (Public)
router.get('/', protectAdmin, getMessages);    // Retrieve all messages (Protected)
router.delete('/:id', protectAdmin, deleteMessage); // Delete a message (Protected)

export default router;

