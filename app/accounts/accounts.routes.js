// Imports dependencies.
const express = require('express');

// Imports implementation details for CRUD endpoints.
const accountsController = require('./accounts.controller');
// Imports JSON webtoken middleware.
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

// Exports router to be used in server.js.
module.exports = router;