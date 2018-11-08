// Exports module to be used in other files.
window.HTTP_MODULE = {
  signupUser,
  loginUser,
  createTransaction,
  getTransactionById,
  getUserTransactions,
  updateTransaction,
  deleteTransaction,
  getUserBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
  getUserAccounts
};

function signupUser(options) {
  const { userData, onSuccess, onError } = options;

  $.ajax({
    type: 'POST',
    url: '/users/',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(userData),
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
        onError(err);
      }
    }
  });
};

function loginUser(options) {
  const { userData, onSuccess, onError } = options;

  $.ajax({
    type: 'POST',
    url: '/auth/login',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(userData),
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
        onError(err);
      }
    }
  });
};

function createTransaction(options) {
  const { jwtToken, newTransaction, onSuccess, onError } = options;

  $.ajax({
    type: 'POST',
    url: '/transactions',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(newTransaction),
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
    },
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
        onError();
      }
    }
  });
};

function getTransactionById(options) {
  const { transactionid, onSuccess } = options;
  $.getJSON(`/transactions/${transactionid}`, onSuccess);
};

function getUserTransactions(options) {
  const { jwtToken, onSuccess, onError } = options;

  $.ajax({
    type: 'GET',
    url: '/transactions',
    contentType: 'application/json',
    dataType: 'json',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
    },
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
        onError(err);
      }
    }
  });
};

function updateTransaction(options) {
  const { jwtToken, transactionId, updatedTransaction, onSuccess, onError } = options;

  $.ajax({
    type: 'PUT',
    url: `/transactions/${transactionId}`,
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(updatedTransaction),
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
    },
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
        onError(err);
      }
    }
  });
};

function deleteTransaction(options) {
  const { transactionId, jwtToken, onSuccess, onError } = options;
  $.ajax({
      type: 'DELETE',
      url: `/transactions/${transactionId}`,
      contentType: 'application/json',
      dataType: 'json',
      data: undefined,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
      },
      success: onSuccess,
      error: err => {
        console.error(err);
        if (onError) {
          onError(err);
        }
      }
  });
};

function createBudget(options) {
  const { jwtToken, newBudget, onSuccess, onError } = options;

  $.ajax({
    type: 'POST',
    url: '/budgets',
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(newBudget),
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
    },
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
        onError();
      }
    }
  });
};

function getUserBudgets(options) {
  const { jwtToken, onSuccess, onError } = options;

  $.ajax({
    type: 'GET',
    url: '/budgets',
    contentType: 'application/json',
    dataType: 'json',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
    },
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
        onError(err);
      }
    }
  });
};

function updateBudget(options) {
  const { jwtToken, budgetId, updatedBudget, onSuccess, onError } = options;

  $.ajax({
    type: 'PUT',
    url: `/budgets/${budgetId}`,
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify(updatedBudget),
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
    },
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
        onError(err);
      }
    }
  });
};

function deleteBudget(options) {
  const { budgetId, jwtToken, onSuccess, onError } = options;
  $.ajax({
      type: 'DELETE',
      url: `/budgets/${budgetId}`,
      contentType: 'application/json',
      dataType: 'json',
      data: undefined,
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
      },
      success: onSuccess,
      error: err => {
        console.error(err);
        if (onError) {
          onError(err);
        }
      }
  });
};

function getUserAccounts(options) {
  const { jwtToken, onSuccess, onError } = options;

  $.ajax({
    type: 'GET',
    url: '/accounts',
    contentType: 'application/json',
    dataType: 'json',
    beforeSend: function (xhr) {
      xhr.setRequestHeader('Authorization', `Bearer ${jwtToken}`);
    },
    success: onSuccess,
    error: err => {
      console.error(err);
      if (onError) {
        onError(err);
      }
    }
  });
};