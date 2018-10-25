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
    };
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

// RETRIEVES budget by ID
exports.getBudgetById = (request, response) => {
  Budget.findById(request.params.budgetid)
    .then(budget => {
      return response.status(HTTP_STATUS_CODES.OK).json(budget.serialize());
    })
    .catch(error => {
      return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
    });
};

// UPDATES budget by ID
exports.updateBudgetById = (request, response) => {
  const updatedBudget = {
    category: request.body.category,
    amount: request.body.amount
  };

  // Step 1: Validate user's input is correct.
  const requiredFields = ['category', 'amount'];
  for (let i=0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in request.body)) {
      return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: "Missing a field" });
    }
  };

  // Step 2: Finds budget by ID and updates.
  Budget.findByIdAndUpdate(request.params.budgetid, updatedBudget)
    .then(() => {
      // Since update was performed we end request with No Content status code.
      return response.status(HTTP_STATUS_CODES.NO_CONTENT).end();
    })
    .catch(error => {
      return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
    });
};

// DELETES budget by ID
exports.deleteBudgetById = (request, response) => {
  // Step 1: Finds budget by ID and removes.
  Budget.findByIdAndDelete(request.params.budgetid)
    .then(() => {
      // Since deletion was performed we end request with No Content status code.
      return response.status(HTTP_STATUS_CODES.NO_CONTENT).end();
    })
    .catch(error => {
      return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
    });
};