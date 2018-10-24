const express = require('express');
const accountsController = require('./accounts.controller');

let router = express.Router();

// CREATES account.
router.post('/', accountsController.createNewAccount);
// RETRIEVES all accounts.
router.get('/all', accountsController.getAllAccounts);
// RETRIEVES account by ID.
router.get('/:accountid', accountsController.getAccountById);
// UPDATES account by ID.
router.put('/:accountid', accountsController.updateAccountById);
// DELETES budget by ID.
router.delete('/:accountid', accountsController.deleteAccountById);

module.exports = router;