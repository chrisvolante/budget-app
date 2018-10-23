const { Budget, BudgetJoiSchema } = require('./budgets.model');
const { HTTP_STATUS_CODES } = require('../config');
const Joi = require('joi');

// CREATES budget.
exports.createNewBudget = (request, response) => {
    const newBudget = {
        category: request.body.category,
        amount: request.body.amount,
        date: Date.now()
    };
    console.log(newBudget);
    // Step 1: Validate user's input is correct using Joi.
    const validation = Joi.validate(newBudget, BudgetJoiSchema);
    console.log(validation);
    if (validation.error) {
        return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: validation.error });
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

// RETRIEVES all budgets
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