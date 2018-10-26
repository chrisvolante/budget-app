const mongoose = require('mongoose');

// Each Mongoose schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const accountsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  name: { type: String, required: true },
  balance: { type: Number, default: 0 }
});

// Define mongoose instance method.
// Able to sanitize accounts object and not return sensitive information.
accountsSchema.methods.serialize = function() {
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
    name: this.name,
    balance: this.balance
  };
};

const Account = mongoose.model('accounts', accountsSchema);
module.exports = { Account };
