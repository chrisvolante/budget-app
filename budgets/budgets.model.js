const mongoose = require('mongoose');
const Joi = require('joi');

// Each Mongoose schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const budgetsSchema = new mongoose.Schema({
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

// Define Mongoose instance method.
// Able to sanitize transactions object and not return sensitive information.
budgetsSchema.methods.serialize = function() {
    return {
        id: this._id,
        category: this.category,
        amount: this.amount,
        date: this.date
    };
};

// Define validation schema using Joi.
const BudgetsJoiSchema = Joi.object().keys({
    category: Joi.string().min(1).required(),
    amount: Joi.number().required(),
    date: Joi.date().timestamp()
});

const Budget = mongoose.model('budgets', budgetsSchema);
module.exports = { Budget, BudgetsJoiSchema };