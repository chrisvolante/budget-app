const express = require('express');
const budgetsController = require('./budgets.controller');

let router = express.Router();

// CREATES budget.
router.post('/', budgetsController.createNewBudget);
// RETRIEVES all budgets.
router.get('/all', budgetsController.getAllBudgets);
// RETRIEVES budget by ID.
router.get('/:budgetid', budgetsController.getBudgetById);
// UPDATES budget by ID.
router.put('/:budget', budgetsController.updateBudgetById);
// DELETES budget by ID.
router.delete('/:budgetid', budgetsController.deleteBudgetById);

module.exports = router;