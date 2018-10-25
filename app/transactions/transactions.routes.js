const express = require('express');
const transactionsController = require('./transactions.controller');

let router = express.Router();

// CREATES transaction.
router.post('/', transactionsController.createNewTransaction);
// RETRIEVES all transactions.
router.get('/all', transactionsController.getAllTransactions);
// RETRIEVES transaction by ID.
router.get('/:transactionid', transactionsController.getTransactionById);
// UPDATES transaction by ID.
router.put('/:transactionid', transactionsController.updateTransactionById);
// DELETES transaction by ID.
router.delete('/:transactionid', transactionsController.deleteTransactionById);

module.exports = router;
