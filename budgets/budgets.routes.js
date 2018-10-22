const express = require('express');
const budgetsController = require('./budgets.controller');

let router = express.Router();

// RETRIEVES all budget categories
router.get('/budgets', budgetsController.getAllBudgets);