import express from 'express';
import getAllTasksController from '../controllers/getAllTasksController.js';
import getTaskByIdController from '../controllers/getTaskByIdController.js';
import createTaskController from '../controllers/createTaskController.js';
import updateTaskController from '../controllers/updateTaskController.js';
import deleteTaskController from '../controllers/deleteTaskController.js';

const router = express.Router();

router.get('/', getAllTasksController);
router.get('/:id', getTaskByIdController);
router.post('/', createTaskController);
router.put('/:id', updateTaskController);
router.delete('/:id', deleteTaskController);

export default router;
