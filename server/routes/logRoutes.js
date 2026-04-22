const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

// @desc    Create a new health log (AI calculation happens here)
// @route   POST /api/logs
router.post('/', logController.createLog);

// @desc    Get all logs for a specific user (for the Chart)
// @route   GET /api/logs/:userId
router.get('/:userId', logController.getLogs);

module.exports = router;