import express from 'express';
import { 
  getProjects, 
  getProjectById, 
  createProject, 
  updateProject, 
  deleteProject 
} from '../controllers/projectController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Define routes for /api/projects
router.get('/', getProjects);                   // Fetch all projects (Public)
router.post('/', protectAdmin, createProject);   // Add a new project (Protected)

// Define routes for /api/projects/:id
router.get('/:id', getProjectById);               // Fetch a single project (Public)
router.put('/:id', protectAdmin, updateProject);    // Update a project (Protected)
router.delete('/:id', protectAdmin, deleteProject); // Delete a project (Protected)

export default router;

