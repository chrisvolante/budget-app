let STATE = {};

const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;
const ETC = window.ETC_MODULE;

$(document).ready(onReady);

function onReady() {
  STATE.transactionid = ETC.getQueryStringParameter('id');
  STATE.authUser = CACHE.getAuthenticatedUserFromCache();

  $('#update-transactions-form').on('submit', onUpdateSubmit);
};

function onUpdateSubmit(event) {
  event.preventDefault();

  let updatedTransaction = {
    payee: $('#payee-text').val(),
    amount: $('#amount-number').val(),
    budgetsCategory: $('#budgets-category-text').val(),
    accountsName: $('#accounts-name-text').val()
  };

  HTTP.updateTransaction({
    jwtToken: STATE.authUser.jwtToken,
    transactionId: STATE.transactionid,
    updatedTransaction: updatedTransaction,
    onSuccess: transaction => {
      alert('Transaction updated succesfully, redirecting ...');
      window.open('/', '_self');
    },
    onError: err => {
      alert('Internal Server Error (see console)');
      console.error(err);
    }
  });
};