import express from 'express';

// Task Controllers
import getAllTasksController from '../controllers/getAllTasksController.js';
import getTaskByIdController from '../controllers/getTaskByIdController.js';
import createTaskController from '../controllers/createTaskController.js';
import updateTaskController from '../controllers/updateTaskController.js';
import deleteTaskController from '../controllers/deleteTaskController.js';

// Project Controllers
import getAllProjectsController from '../controllers/getAllProjectsController.js';
import getProjectBillingController from '../controllers/getProjectBillingController.js';
import createProjectController from '../controllers/createProjectController.js';
import updateProjectController from '../controllers/updateProjectController.js';
import deleteProjectController from '../controllers/deleteProjectController.js';

// Auth Controllers
import registerController from '../controllers/registerController.js';
import loginController from '../controllers/loginController.js';

// Middleware
import { verifyToken } from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

// ============================================
// PUBLIC ROUTES
// ============================================
router.post('/auth/register', registerController);
router.post('/auth/login', loginController);

// ============================================
// PROTECTED TASK ROUTES (All logged-in users)
// ============================================
router.get('/tasks', verifyToken, getAllTasksController);
router.get('/tasks/:id', verifyToken, getTaskByIdController);
router.post('/tasks', verifyToken, createTaskController);
router.put('/tasks/:id', verifyToken, updateTaskController);
router.delete('/tasks/:id', verifyToken, deleteTaskController);

// ============================================
// PROTECTED PROJECT ROUTES
// ============================================
// 1. Read-only for standard users checking their assigned project
router.get('/projects', verifyToken, getAllProjectsController);
router.get('/projects/:id/billing', verifyToken, getProjectBillingController);

// 2. Strict Super Admin routes for managing the company workspace
router.post('/projects', verifyToken, requireRole(['super_admin']), createProjectController);
router.put('/projects/:id', verifyToken, requireRole(['super_admin']), updateProjectController);
router.delete('/projects/:id', verifyToken, requireRole(['super_admin']), deleteProjectController);

export default router;
