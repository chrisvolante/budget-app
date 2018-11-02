const express = require('express');
const budgetsController = require('./budgets.controller');
const { jwtPassportMiddleware } = require('../auth/auth.strategies');

let router = express.Router();

// CREATES user budget.
router.post('/', jwtPassportMiddleware, budgetsController.createNewBudget);

// RETRIEVES user's budgets.
router.get('/', jwtPassportMiddleware, budgetsController.getUserBudgets);

// RETRIEVES all budgets.
router.get('/all', budgetsController.getAllBudgets);

// RETRIEVES one budget by ID.
router.get('/:budgetid', jwtPassportMiddleware, budgetsController.getBudgetById);

// UPDATES budget by ID.
router.put('/:budgetid', jwtPassportMiddleware, budgetsController.updateBudgetById);

// DELETES budget by ID.
router.delete('/:budgetid', jwtPassportMiddleware, budgetsController.deleteBudgetById);

module.exports = router;