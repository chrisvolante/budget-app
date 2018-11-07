let STATE = {};

const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;
const ETC = window.ETC_MODULE;

$(document).ready(onReady);

function onReady() {
  STATE.budgetid = ETC.getQueryStringParameter('id');
  STATE.authUser = CACHE.getAuthenticatedUserFromCache();

  $('#update-budgets-form').on('submit', onUpdateSubmit);
};

function onUpdateSubmit(event) {
  event.preventDefault();

  let updatedBudget = {
    category: $('#budgets-category-text').val(),
    amount: $('#amount-number').val()
  };

  HTTP.updateBudget({
    jwtToken: STATE.authUser.jwtToken,
    budgetId: STATE.budgetid,
    updatedBudget: updatedBudget,
    onSuccess: budget => {
      alert('Budget updated succesfully, redirecting ...');
      window.open('/', '_self');
    },
    onError: err => {
      alert('Internal Server Error (see console)');
      console.error(err);
    }
  });
};