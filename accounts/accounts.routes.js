const express = require('express');
const accountsController = require('./accounts.controller');

let router = express.Router();

// RETRIEVES all accounts
router.get('/all', accountsController.getAllAccounts);

module.exports = router;