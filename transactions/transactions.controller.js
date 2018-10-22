// RETRIEVES all transactions
exports.getAllTransactions = (req, res) => {
    res.status(200).json({
        msg: 'view all transactions.'
    })
};
