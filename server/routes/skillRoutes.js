import express from 'express';
import { 
  getSkills, 
  createSkill, 
  updateSkill, 
  deleteSkill 
} from '../controllers/skillController.js';

const router = express.Router();

// Define routes for /api/skills
router.get('/', getSkills);       // Fetch all skills
router.post('/', createSkill);     // Add a new skill
router.put('/:id', updateSkill);    // Update a skill
router.delete('/:id', deleteSkill); // Delete a skill

export default router;
