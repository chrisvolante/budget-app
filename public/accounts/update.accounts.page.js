let STATE = {};

const RENDER = window.RENDER_MODULE;
const HTTP = window.HTTP_MODULE;
const CACHE = window.CACHE_MODULE;
const ETC = window.ETC_MODULE;

$(document).ready(onReady);

function onReady() {
  STATE.accountid = ETC.getQueryStringParameter('id');
  STATE.authUser = CACHE.getAuthenticatedUserFromCache();

  $('#update-accounts-form').on('submit', onUpdateSubmit);
};

function onUpdateSubmit(event) {
  event.preventDefault();

  let updatedAccount = {
    name: $('#accounts-name-text').val(),
    balance: $('#accounts-balance').val()
  };

  HTTP.updateAccount({
    jwtToken: STATE.authUser.jwtToken,
    accountId: STATE.accountid,
    updatedAccount: updatedAccount,
    onSuccess: account => {
      alert('Account updated succesfully, redirecting ...');
      window.open('/', '_self');
    },
    onError: err => {
      alert('Internal Server Error (see console)');
      console.error(err);
    }
  });
};