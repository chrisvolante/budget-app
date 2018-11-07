// Imports dependencies.
const mongoose = require('mongoose');

// Defines mongoose schema for accounts.
const accountsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  name: { type: String, required: true },
  balance: { type: Number, default: 0 }
});

// Define mongoose instance method.
// Able to sanitize accounts object and not return sensitive information.
accountsSchema.methods.serialize = function() {
  let user;
  // We serialize the user if it's populated to avoid returning any sensitive information.
  if (typeof this.user.serialize === 'function') {
      user = this.user.serialize();
  } else {
      user = this.user;
  };
  return {
    id: this._id,
    user: user,
    name: this.name,
    balance: this.balance
  };
};

// Exports Account mongoose schema model to be used in accounts.controller.js.
const Account = mongoose.model('accounts', accountsSchema);
module.exports = { Account };
