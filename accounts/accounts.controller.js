// RETRIEVES all accounts
exports.getAllAccounts = (req, res) => {
    res.status(200).json({
        msg: 'view all accounts.'
    })
};
