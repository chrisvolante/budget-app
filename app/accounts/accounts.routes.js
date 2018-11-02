const express = require('express');
const accountsController = require('./accounts.controller');
const { jwtPassportMiddleware } = require('../auth/auth.strategies');

let router = express.Router();

// CREATES account.
router.post('/', jwtPassportMiddleware, accountsController.createNewAccount);

// RETRIEVES user's accounts.
router.get('/', jwtPassportMiddleware, accountsController.getUserAccounts);

// RETRIEVES all accounts.
router.get('/all', accountsController.getAllAccounts);

// RETRIEVES account by ID.
router.get('/:accountid', jwtPassportMiddleware, accountsController.getAccountById);

// UPDATES account by ID.
router.put('/:accountid', jwtPassportMiddleware, accountsController.updateAccountById);

// DELETES budget by ID.
router.delete('/:accountid', jwtPassportMiddleware, accountsController.deleteAccountById);

module.exports = router;