let STATE = {};

const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;

$(document).ready(onReady);

function onReady() {
  STATE.authUser = CACHE.getAuthenticatedUserFromCache();

  $('#new-accounts-form').on('submit', onCreateSubmit);
};

function onCreateSubmit(event) {
  event.preventDefault();

  let newAccount = {
    name: $('#accounts-name-text').val(),
    balance: $('#accounts-balance').val()    
  };

  HTTP.createAccount({
    jwtToken: STATE.authUser.jwtToken,
    newAccount: newAccount,
    onSuccess: account => {
      alert('Account created succesfully, redirecting ...');
      window.open('/', '_self');
    },
    onError: err => {
      alert('Internal Server Error (see console)');
      console.error(err);
    }
  });
};