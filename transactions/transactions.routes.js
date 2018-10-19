const express = require('express');
const transactionsController = require('./transactions.controller');

let router = express.Router();

router.get('/all', transactionsController.getAllTransactions);

module.exports = router;