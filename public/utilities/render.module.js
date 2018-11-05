window.RENDER_MODULE = {
  renderTransactionsList
};

function renderTransactionsList(transactions) {
  let tableTemplateString = `
    <div id="transaction">
      <table>
        <tr>
          <th>Date</th>
          <th>Budget</th>
          <th>Payee</th>
          <th>Amount</th>
          <th>Account</th>
          <th></th>
          <th></th>
        </tr>
    `;
    
  // Adds data from transactions object into the tableTemplateString.
  for (let i = 0; i < transactions.length; i++) {
    tableTemplateString += transactionToHtml(transactions[i]);
  };

  // Populates table with transactions data.
  $("#transactions-list").append(tableTemplateString + "</table></div>");

  function transactionToHtml(transaction) {
    return (`
      <tr>
          <td>${moment(transaction.createDate).format("MMM Do YYYY")}</td>
          <td>${transaction.budgetsCategory}</td>
          <td>${transaction.payee}</td>
          <td>${transaction.amount}</td>
          <td>${transaction.accountsName}</td>
          <td><button id="button-update" data-id="${transaction.id}">Update</button></td>
          <td><button id="button-delete" data-id="${transaction.id}">Delete</button></td>
      </tr>
    `);
  };

};