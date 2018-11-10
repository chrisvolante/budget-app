let STATE = {};

// Imports modules from utilities folder.
// const RENDER = window.RENDER_MODULE;
// const CACHE = window.CACHE_MODULE;
// const HTTP = window.HTTP_MODULE;

// Waits for page to load before running code.
$(document).ready(onPageLoad);

function onPageLoad() {
  updateAuthenticatedUI();
  
  if (STATE.authUser) {
    HTTP.getUserTransactions({
      jwtToken: STATE.authUser.jwtToken,
      onSuccess: RENDER.renderTransactionsList
    });
    HTTP.getUserBudgets({
      jwtToken: STATE.authUser.jwtToken,
      onSuccess: RENDER.renderBudgetsList
    });
    HTTP.getUserAccounts({
      jwtToken: STATE.authUser.jwtToken,
      onSuccess: RENDER.renderAccountsList
    });
  } 

  $('#logout-button').on('click', onLogoutButtonClick);
  $('.transactions-list').on('click', '#button-delete', onDeleteButtonClick);
  $('.transactions-list').on('click', '#button-update', onUpdateButtonClick);
  $('.budgets-list').on('click', '#button-update', onUpdateButtonClick);
  $('.budgets-list').on('click', '#button-delete', onDeleteButtonClick);
  $('.accounts-list').on('click', '#button-update', onUpdateButtonClick);
  $('.accounts-list').on('click', '#button-delete', onDeleteButtonClick);
};

function updateAuthenticatedUI() {
  const authUser = CACHE.getAuthenticatedUserFromCache();
  if (authUser) {
      STATE.authUser = authUser;
      $('.default-menu').css('display', 'none');
      $('.greeting').html(`Welcome, ${authUser.name}`);
      $('.auth-menu').removeAttr('hidden');
  } else {
      $('.default-menu').css('display', 'flex');
  }
};

function onLogoutButtonClick(event) {
  const confirmation = confirm('Are you sure you want to logout?');
  if (confirmation) {
    CACHE.deleteAuthenticatedUserFromCache();
    window.open('/', '_self');
  };
};

function onDeleteButtonClick(event) {
  event.stopImmediatePropagation(); 
  // Step 1: Get the transaction id to delete from it's parent.
  const transactionId = $(event.currentTarget).data('id');
  const budgetId = $(event.currentTarget).data('id');
  const accountId = $(event.currentTarget).data('id');
  // Step 2: Verify user is sure of deletion.
  const userSaidYes = confirm('Are you sure you want to delete?');
  if (userSaidYes) {
    // Step 3: Make ajax call to delete transaction.
    HTTP.deleteTransaction({
        transactionId: transactionId,
        jwtToken: STATE.authUser.jwtToken,
        onSuccess: () => {
            // Step 4: If succesful, reload the transactions list.
            HTTP.getUserTransactions({
              jwtToken: STATE.authUser.jwtToken,
              onSuccess: window.open('/', '_self')
            });
        }
    });
    HTTP.deleteBudget({
      budgetId: budgetId,
      jwtToken: STATE.authUser.jwtToken,
      onSuccess: () => {
          // Step 4: If succesful, reload the budgets list.
          HTTP.getUserBudgets({
            jwtToken: STATE.authUser.jwtToken,
            onSuccess: window.open('/', '_self')
          });
      }
    });
    HTTP.deleteAccount({
      accountId: accountId,
      jwtToken: STATE.authUser.jwtToken,
      onSuccess: () => {
        HTTP.getUserAccounts({
          jwtToken: STATE.authUser.jwtToken,
          onSuccess: window.open('/', '_self')
        });
      }
    });
  }
};

function onUpdateButtonClick(event) {
  event.stopImmediatePropagation(); 

  const transactionId = $(event.currentTarget).data('id');
  const budgetId = $(event.currentTarget).data('id');
  const accountId = $(event.currentTarget).data('id');
  const currentFeature = $(event.currentTarget).data('feature');

  console.log(currentFeature);

  if(currentFeature === "transaction") {
    window.open(`/transactions/update.html?id=${transactionId}`, '_self');
  } else if(currentFeature === "budget") {
    window.open(`/budgets/update.budgets.html?id=${budgetId}`, '_self');
  } else if(currentFeature === "account") {
    window.open(`/accounts/update.accounts.html?id=${accountId}`, '_self');
  }

}; 