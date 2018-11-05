let STATE = {};

// Imports modules from utilities folder.
const RENDER = window.RENDER_MODULE;
const CACHE = window.CACHE_MODULE;
const HTTP = window.HTTP_MODULE;

// Waits for page to load before running code.
$(document).ready(onPageLoad);

function onPageLoad() {
  updateAuthenticatedUI();
  
  if (STATE.authUser) {
    HTTP.getUserTransactions({
      jwtToken: STATE.authUser.jwtToken,
      onSuccess: RENDER.renderTransactionsList
    });
  } 

  $('#logout-button').on('click', onLogoutButtonClick);
  $('#transactions-list').on('click', '#button-delete', onDeleteButtonClick);
  $('#transactions-list').on('click', '#button-update', onUpdateButtonClick);
};

function onLogoutButtonClick(event) {
  const confirmation = confirm('Are you sure you want to logout?');
  if (confirmation) {
    CACHE.deleteAuthenticatedUserFromCache();
    window.open('/auth/login.html', '_self');
  };
};

function onDeleteButtonClick(event) {
  event.stopImmediatePropagation(); 
  // Step 1: Get the transaction id to delete from it's parent.
  const transactionId = $(event.currentTarget).attr('data-id');
  console.log(transactionId);
  // Step 2: Verify use is sure of deletion
  const userSaidYes = confirm('Are you sure you want to delete this transaction?');
  if (userSaidYes) {
      // Step 3: Make ajax call to transaction note
      HTTP.deleteTransaction({
          transactionId: transactionId,
          jwtToken: STATE.authUser.jwtToken,
          onSuccess: () => {
              // Step 4: If succesful, reload the transactions list
              alert('Note deleted succesfully, reloading results ...');
              HTTP.getUserTransactions({
                  jwtToken: STATE.authUser.jwtToken,
                  onSuccess: window.open('/', '_self')
              });
          }
      });
  }
};

function onUpdateButtonClick(event) {
  
  window.open(`/transactions/update.html?id=${transactionId}`, '_self');
}; 

function updateAuthenticatedUI() {
  const authUser = CACHE.getAuthenticatedUserFromCache();
  if (authUser) {
      STATE.authUser = authUser;
      $('#nav-greeting').html(`Welcome, ${authUser.name}`);
      $('#auth-menu').removeAttr('hidden');
  } else {
      $('#default-menu').removeAttr('hidden');
  }
};

// // Event listener for the delete button.
// $('body').on('click', '.button-delete', function () {
//     console.log($(this).data('id'));
//     // API call to delete transaction by id.
//     $.ajax({
//         url: `/transactions/${$(this).data('id')}`,
//         type: "DELETE",
//         success: function (response) {
//             alert("Transaction was deleted.");
//         }
//     });
// });

// $('body').on('click', '.button-update', function () {
//   $('#modal-update').css('display', 'block');
// } );

// $('#modal-update').on('click', function() {
//   $('#modal-update').css('display', 'none');
// });
