let STATE = {};

const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

$(document).ready(onReady);

function onReady() {
  STATE.authUser = CACHE.getAuthenticatedUserFromCache();

  $('#new-budgets-form').on('submit', onCreateSubmit);
};

function onCreateSubmit(event) {
  event.preventDefault();

  let newBudget = {
    category: $('#budgets-category-text').val(),
    amount: $('#amount-number').val()    
  };

  HTTP.createBudget({
    jwtToken: STATE.authUser.jwtToken,
    newBudget: newBudget,
    onSuccess: budget => {
      alert('Budget created succesfully, redirecting ...');
      window.open('/', '_self');
    },
    onError: err => {
      alert('Internal Server Error (see console)');
      console.error(err);
    }
  });
};