const mongoose = require('mongoose');

// Each Mongoose schema maps to a MongoDB collection and defines the shape of the documents within that collection.
const accountsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    balance: { type: Number, default: 0 }
});

module.exports = mongoose.model('accounts', accountsSchema);
