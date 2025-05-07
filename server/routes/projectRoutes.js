import express from 'express';
import { createProject, getProjects ,deleteProject,updateProject,getProjectById} from '../controllers/projectController.js';

const router = express.Router();

router.post('/projects', createProject);  // Create project
router.get('/projects', getProjects);     // Get all projects
router.get('/projects/:id', getProjectById); // get project by id
router.put('/projects/:id', updateProject); // update project by id
router.delete('/projects/:id', deleteProject); // delete project by id

export default router;
