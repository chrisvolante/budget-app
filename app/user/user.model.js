const mongoose = require('mongoose');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

// Each Mongoose schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
});

// Define Mongoose instance method.
// Able to sanitize transactions object and not return sensitive information.
userSchema.methods.serialize = function() {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    username: this.username
  };
};

// Hashes password before storing.
userSchema.statics.hashPassword = function(password) {
  return bcrypt.hash(password, 10);
};

// Validates hashed passwords.
userSchema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password);
};

// Validates user's input using Joi.
const UserJoiSchema = Joi.object().keys({
  name: Joi.string().min(1).trim().required(),
  username: Joi.string().alphanum().min(4).max(30).trim().required(),
  password: Joi.string().min(8).max(30).trim().required(),
  email: Joi.string().email().trim().required()
});

const User = mongoose.model('user', userSchema);
module.exports = { User, UserJoiSchema };