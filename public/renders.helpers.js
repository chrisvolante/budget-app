// Renders the transaction data to the DOM.
function renderTransaction(transaction) {
  return (`
      <tr>
          <td>${moment(transaction.createDate).format("MMM Do YYYY")}</td>
          <td>${transaction.budgetsCategory}</td>
          <td>${transaction.payee}</td>
          <td>$${transaction.amount}</td>
          <td>${transaction.accountsName}</td>
          <td><button class="button-update" data-id="${transaction.id}">Update</button></td>
          <td><button class="button-delete" data-id="${transaction.id}">Delete</button></td>
      </tr>
  `);
};