const { Budget } = require('./budgets.model');
const { HTTP_STATUS_CODES } = require('../config');

// CREATES budget.
exports.createNewBudget = (request, response) => {
    const newBudget = {
        category: request.body.category,
        amount: request.body.amount,
        date: Date.now()
    };
    // Step 1: Validate user's input is correct.
    const requiredFields = ['category', 'amount'];
    for (let i=0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in request.body)) {
            return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: "Missing a field." });
        }
    };

    // Step 2: Create new budget.
    Budget.create(newBudget)
        .then(createdBudget => {
            return response.status(HTTP_STATUS_CODES.CREATED).json(createdBudget.serialize());
        })
        .catch(error => {
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
};

// RETRIEVES all budgets.
exports.getAllBudgets = (request, response) => {
    Budget.find()
        .then(budgets => {
            return response.status(HTTP_STATUS_CODES.OK).json(
                budgets.map(budget => budget.serialize())
            );
        })
        .catch(error => {
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
};