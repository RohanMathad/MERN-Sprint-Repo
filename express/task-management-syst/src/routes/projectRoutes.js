const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');

router.get('/:id/billing/', projectController.getProjectBilling);

module.exports = router;