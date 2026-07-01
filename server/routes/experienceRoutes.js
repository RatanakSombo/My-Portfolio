import express from 'express';
import { 
  getExperience, 
  createExperience, 
  updateExperience, 
  deleteExperience 
} from '../controllers/experienceController.js';

const router = express.Router();

// Define routes for /api/experience
router.get('/', getExperience);       // Fetch all experience items
router.post('/', createExperience);     // Add an experience item
router.put('/:id', updateExperience);    // Update an experience item
router.delete('/:id', deleteExperience); // Delete an experience item

export default router;
