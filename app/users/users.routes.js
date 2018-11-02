const express = require('express');
const usersController = require('./users.controller');

let router = express.Router();

// CREATES new user.
router.post('/', usersController.createNewuser);

// RETRIEVES all users.
router.get('/all', usersController.getAllUsers);

// RETRIEVES user by ID.
router.get('/:userid', usersController.getUserById);

// DELETES user by ID.
router.delete('/:userid', usersController.deleteUserById);

module.exports = router;