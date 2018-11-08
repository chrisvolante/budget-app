let STATE = {};

const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

let budgetsCategory;

$(document).ready(onReady);

function onReady() {
  STATE.authUser = CACHE.getAuthenticatedUserFromCache();

  HTTP.getUserBudgets({
    jwtToken: STATE.authUser.jwtToken,
    onSuccess: (response) => { 
      budgetsCategory = response;
    }
  });

  $('#new-transactions-form').on('submit', onCreateSubmit);
  $('#budgets-category-text').on('change', filterBudgetsCategory);
};

function filterBudgetsCategory(value) {
  budgetsCategory.forEach((element, index) => {
    let re = new RegExp(value, "i");
    if(element.category.match(re)) {
      $('.budgets-categories-results').append(`<p>${element.category}</p>`)
    }
  });
};

function onCreateSubmit(event) {
  event.preventDefault();

  let newTransaction = {
    payee: $('#payee-text').val(),
    amount: $('#amount-number').val(),
    budgetsCategory: $('#budgets-category-text').val(),
    accountsName: $('#accounts-name-text').val()
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