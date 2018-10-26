const mongoose = require('mongoose');

// Each Mongoose schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const budgetsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

// Define Mongoose instance method.
// Able to sanitize budgets object and not return sensitive information.
budgetsSchema.methods.serialize = function() {
  let user;
  // We serialize the user if it's populated to avoid returning any sensitive information, like the password hash.
  if (typeof this.user.serialize === 'function') {
      user = this.user.serialize();
  } else {
      user = this.user;
  };
  return {
    id: this._id,
    user: user,
    category: this.category,
    amount: this.amount,
    date: this.date
  };
};

const Budget = mongoose.model('budgets', budgetsSchema);
module.exports = { Budget };