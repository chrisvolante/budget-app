const mongoose = require('mongoose');

// Each Mongoose schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const transactionsSchema = new mongoose.Schema({
    payee: { type: String, required: true },
    amount: { type: Number, required: true },
    // Will have to be dynamic variable from budgetsSchema
    budgetsCategory: { type: String, required: true},
    // will have to be dynamic variable from accountsSchema
    accountsCategory: { type: String, required: true},
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('transactions', transactionsSchema);
