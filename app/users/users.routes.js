// Imports dependencies.
const express = require('express');

// Imports implementation details for CRD endpoints.
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

// Exports router to be used in server.js.
module.exports = router;