import express from 'express';
import getProjectBillingController from '../controllers/getProjectBillingController.js';

const router = express.Router();

router.get('/:id/billing/', getProjectBillingController);

export default router;
