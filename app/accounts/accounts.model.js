const mongoose = require('mongoose');

// Each Mongoose schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const accountsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    balance: { type: Number, default: 0 }
});

// Define mongoose instance method.
// Able to sanitize accounts object and not return sensitive information.
accountsSchema.methods.serialize = function() {
    return {
        id: this._id,
        name: this.name,
        balance: this.balance
    };
;}

const Account = mongoose.model('accounts', accountsSchema);
module.exports = { Account }
