const mongoose = require('mongoose');

// Each Mongoose schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const transactionsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  payee: { type: String, required: true },
  amount: { type: Number, required: true },
  budgetsCategory: { type: String, required: true },
  accountsName: { type: String, required: true },
  createDate: { type: Date },
  updateDate: { type: Date, default: Date.now }
});

// Define Mongoose instance method.
// Able to sanitize transactions object and not return sensitive information.
transactionsSchema.methods.serialize = function () {
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
    payee: this.payee,
    amount: this.amount,
    budgetsCategory: this.budgetsCategory,
    accountsName: this.accountsName,
    createDate: this.createDate,
    updateDate: this.updateDate
  };
};

const Transaction = mongoose.model('transactions', transactionsSchema);
module.exports = { Transaction };