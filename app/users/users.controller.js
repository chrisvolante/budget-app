const Joi = require('joi');

const { User, UserJoiSchema } = require('./users.model');
const { HTTP_STATUS_CODES } = require('../config');

// CREATES new user.
exports.createNewuser = (request, response) => {
  const newUser = {
    name: request.body.name,
    email: request.body.email,
    username: request.body.username,
    password: request.body.password
  };

  // Step 1: Validate new user information is correct.
  // Here, we use the Joi NPM library for easy validation.
  // https://www.npmjs.com/package/joi
  const validation = Joi.validate(newUser, UserJoiSchema);
  if (validation.error) {
    // Step 2A: If validation error is found, end the the request with a server error and error message.
    return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: validation.error });
  }
  // Step 2B: Verify if the new user's email or username doesn't already exist in the database using Mongoose.Model.findOne() 
  // https://mongoosejs.com/docs/api.html#model_Model.findOne
  User.findOne({
    // Mongoose $or operator: https://docs.mongodb.com/manual/reference/operator/query/or/ 
    $or: [
      { email: newUser.email },
      { username: newUser.username }
    ]
  }).then(user => {
    if (user) {
      // Step 3A: If user already exists, abruptly end the request with an error.
      return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: 'Database Error: A user with that username and/or email already exists.' });
    }
    // Step 3B: We should NEVER store raw passwords, so instead we wait while we encrypt it into a hash. 
    return User.hashPassword(newUser.password);
  }).then(passwordHash => {
    newUser.password = passwordHash;
    // Step 4: Once password hash has replaced the raw password, we attempt to create the new user using Mongoose.Model.create()
    // https://mongoosejs.com/docs/api.html#model_Model.create
    User.create(newUser)
      .then(createdUser => {
        // Step 5A: If created successfully, return the newly created user information .
        return response.status(HTTP_STATUS_CODES.CREATED).json(createdUser.serialize());
      })
      .catch(error => {
        // Step 5B: if an error ocurred, respond with an error.
        console.error(error);
        return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({ error: error.message });
      });
  });
};

// RETRIEVES all users.
exports.getAllUsers = (request, response) => {
  User.find()
    .then(users => {
      return response.status(HTTP_STATUS_CODES.OK).json(
        users.map(user => user.serialize())
      );
    })
    .catch(error => {
      return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
    });
};

// RETRIEVES user by ID.
exports.getUserById = (request, response) => {
  User.findById(request.params.userid)
    .then(user => {
      return response.status(HTTP_STATUS_CODES.OK).json(user.serialize());
    })
    .catch(error => {
      return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
    });
};