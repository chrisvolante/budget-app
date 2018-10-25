const mongoose = require('mongoose');

// Each Mongoose schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const budgetsSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

// Define Mongoose instance method.
// Able to sanitize budgets object and not return sensitive information.
budgetsSchema.methods.serialize = function() {
  return {
    id: this._id,
    category: this.category,
    amount: this.amount,
    date: this.date
  };
};

const Budget = mongoose.model('budgets', budgetsSchema);
module.exports = { Budget };