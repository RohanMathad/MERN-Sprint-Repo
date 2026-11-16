import express from 'express';
import * as projectController from '../controllers/projectController.js';

const router = express.Router();

router.get('/:id/billing/', projectController.getProjectBilling);

export default router;
