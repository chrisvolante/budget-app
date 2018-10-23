const mongoose = require('mongoose');

// Each Mongoose schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const transactionsSchema = new mongoose.Schema({
    payee: { type: String, required: true },
    amount: { type: Number, required: true },
    // Will have to be dynamic variable from budgetsSchema
    budgetsCategory: { type: String, required: true },
    // will have to be dynamic variable from accountsSchema
    accountsName: { type: String, required: true },
    createDate: { type: Date },
    updateDate: { type: Date, default: Date.now }
});

// Define Mongoose instance method.
// Able to sanitize transactions object and not return sensitive information.
transactionsSchema.methods.serialize = function() {
    return {
        id: this._id,
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
