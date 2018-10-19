const express = require('express');
const transactionsController = require('./transactions.controller');

let router = express.Router();

//GETS all transactions
router.get('/all', transactionsController.getAllTransactions);

module.exports = router;
