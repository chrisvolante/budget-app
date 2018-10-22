// RETRIEVES all budgets
exports.getAllBudgets = (req, res) => {
    res.status(200).json({
        msg: 'view all budgets.'
    })
};