const express = require('express');
const budgetsController = require('./budgets.controller');

let router = express.Router();

// RETRIEVES all budget categories
router.get('/all', budgetsController.getAllBudgets);

module.exports = router;