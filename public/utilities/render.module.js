window.RENDER_MODULE = {
  renderTransactionsList,
  renderBudgetsList
};

// Renders list of user's transactions to the DOM.
function renderTransactionsList(transactions) {
  let tableTemplateString = `
  <h4><a href="/transactions/create.html">Create New Transaction</a></h4>
    <div class="transaction table">
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
          <td><button id="button-update" data-id="${transaction.id}" data-feature="transaction">Update</button></td>
          <td><button id="button-delete" data-id="${transaction.id}" data-feature="transaction">Delete</button></td>
      </tr>
    `);
  };

};

function renderBudgetsList(budgets) {
  let tableTemplateString = `
    <h4><a href="/budgets/create.budgets.html">Create New Budget</a></h4>
    <div class="budget table">
      <table>
        <tr>
          <th>Category</th>
          <th>Amount</th>
          <th></th>
          <th></th>
        </tr>
  `;

  // Adds data from budgets object into the tableTemplateString.
  for (let i = 0; i < budgets.length; i++) {
    tableTemplateString += budgetToHtml(budgets[i]);
  };

  // Populates table with budgets data.
  $("#budgets-list").append(tableTemplateString + "</table></div>");

  function budgetToHtml(budget) {
    return (`
      <tr>
          <td>${budget.category}</td>
          <td>${budget.amount}</td>
          <td><button id="button-update" data-id="${budget.id}" data-feature="budget">Update</button></td>
          <td><button id="button-delete" data-id="${budget.id}" data-feature="budget">Delete</button></td>
      </tr>
    `);
  };
};