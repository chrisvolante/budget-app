const mongoose = require('mongoose');

// Each Mongoose schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const budgetsSchema = new mongoose.Schema({
    category: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('budgets', budgetsSchema);