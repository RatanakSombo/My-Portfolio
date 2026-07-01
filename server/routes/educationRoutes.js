import express from 'express';
import { 
  getEducation, 
  createEducation, 
  updateEducation, 
  deleteEducation 
} from '../controllers/educationController.js';

const router = express.Router();

// Define routes for /api/education
router.get('/', getEducation);       // Fetch all education items
router.post('/', createEducation);     // Add an education item
router.put('/:id', updateEducation);    // Update an education item
router.delete('/:id', deleteEducation); // Delete an education item

export default router;
