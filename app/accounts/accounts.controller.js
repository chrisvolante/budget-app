const { Account } = require('./accounts.model');
const { HTTP_STATUS_CODES } = require('../config');

// CREATES new account.
exports.createNewAccount = (request, response) => {
  const newAccount = {
    name: request.body.name,
    balance: request.body.balance
  };

  // Step 1: Validate user's input is correct.
  const requiredFields = ['name', 'balance'];
  for (let i=0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if(!(field in request.body)) {
      return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: "Missing a field."});
    };
  };

  // Step 2: Create new account.
  Account.create(newAccount)
    .then(createdAccount => {
      return response.status(HTTP_STATUS_CODES.CREATED).json(createdAccount.serialize());
    })
    .catch(error => {
      return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
    });
};

// RETRIEVES all accounts.
exports.getAllAccounts = (request, response) => {
  Account.find()
    .then(accounts => {
      return response.status(HTTP_STATUS_CODES.OK).json(
        accounts.map(account => account.serialize())
      );
    })
    .catch(error => {
      return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
    });
};

// RETRIEVES account by ID.
exports.getAccountById = (request, response) => {
  Account.findById(request.params.accountid)
    .then(account => {
      return response.status(HTTP_STATUS_CODES.OK).json(account.serialize());
    })
    .catch(error => {
      return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
    });
};
// UPDATES account by ID.
exports.updateAccountById = (request, response) => {
  const updatedAccount = {
    name: request.body.name,
    balance: request.body.balance
  };

  // Step 1: Validate user's input is correct.
  const requiredFields = ['name', 'balance'];
  for (let i=0; i < requiredFields.length; i++) {
    const field = requiredFields[i];
    if (!(field in request.body)) {
      return response.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: "Missing a field" });
    }
  };

  // Step 2: Finds account by ID and updates.
  Account.findByIdAndUpdate(request.params.accountid, updatedAccount)
    .then(() => {
      // Since update was performed we end request with No Content status code.
      return response.status(HTTP_STATUS_CODES.NO_CONTENT).end();
    })
    .catch(error => {
      return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
    });
};

// DELETES account by ID.
exports.deleteAccountById = (request, response) => {
  // Step 1: Finds account by ID and removes.
  Account.findByIdAndDelete(request.params.accountid)
    .then(() => {
      // Since deletion was performed we end request with No Content status code.
      return response.status(HTTP_STATUS_CODES.NO_CONTENT).end();
    })
    .catch(error => {
      return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
    });
};
