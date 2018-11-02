let STATE = {};

const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

$(document).ready(onReady);

function onReady() {
  STATE.authUser = CACHE.getAuthenticatedUserFromCache();

  $('#new-transactions-form').on('submit', onCreateSubmit);
};

function onCreateSubmit(event) {
  event.preventDefault();

  const newTransaction = {
    payee: $('#payee-txt').val(),
    amount: $('#amount-number').val(),
    budgetsCategory: $('budgets-category-text').val(),
    accountsName: $('accounts-name-text').val()
  };

  HTTP.createTransaction({
    jwtToken: STATE.authUser.jwtToken,
    newTransaction: newTransaction,
    onSuccess: transaction => {
      alert('Transaction created succesfully, redirecting ...');
      window.open('/', '_self');
    },
    onError: err => {
      alert('Internal Server Error (see console)');
      console.error(err);
    }
  });
};