let STATE = {};

// Imports modules from utilities folder.
const RENDER = window.RENDER_MODULE;
const CACHE = window.CACHE_MODULE;
const HTTP = window.HTTP_MODULE;

// Waits for page to load before running code.
$(document).ready(onPageLoad);

function onPageLoad() {
  updateAuthenticatedUI();
  
  $('#logout-btn').on('click', onLogoutBtnClick);
};

function onLogoutBtnClick(event) {
  const confirmation = confirm('Are you sure you want to logout?');
  if (confirmation) {
    CACHE.deleteAuthenticatedUserFromCache();
    window.open('/auth/login.html', '_self');
  };
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
}

// // API call to retrieve all of the transactions.
// $.ajax({
//     url: "/transactions/all",
//     type: "GET",
//     success: function (response) {
//         // Table headers for Transactions.
//         let tableTemplateString =
//             `<div class="transaction">
//                 <table>
//                     <tr>
//                         <th>Date</th>
//                         <th>Budget</th>
//                         <th>Payee</th>
//                         <th>Amount</th>
//                         <th>Account</th>
//                         <th></th>
//                         <th></th>
//                     </tr>
//             `;
//         // Adds data from transactions object into the tableTemplateString.
//         for (let i = 0; i < response.length; i++) {
//             tableTemplateString += renderTransaction(response[i]);
//         };
//         // Populates table with transactions data.
//         $(".transactions-list").append(tableTemplateString + "</table>");
//         // 
//         // addUpdateEventListener();
//     }
// });

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
