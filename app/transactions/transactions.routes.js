const express = require('express');
const transactionsController = require('./transactions.controller');
const { jwtPassportMiddleware } = require('../auth/auth.strategies');

let router = express.Router();

// CREATES user transaction.
router.post('/', jwtPassportMiddleware, transactionsController.createNewTransaction);
// RETRIEVES user's transactions.
router.get('/', jwtPassportMiddleware, transactionsController.getUserTransactions);
// RETRIEVES all transactions.
router.get('/all', transactionsController.getAllTransactions);
// RETRIEVES one transaction by ID.
router.get('/:transactionid', jwtPassportMiddleware, transactionsController.getTransactionById);
// UPDATES transaction by ID.
router.put('/:transactionid', jwtPassportMiddleware, transactionsController.updateTransactionById);
// DELETES transaction by ID.
router.delete('/:transactionid', jwtPassportMiddleware, transactionsController.deleteTransactionById);

module.exports = router;