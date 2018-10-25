// Renders the transaction to the DOM.
function renderTransaction(transaction) {
    return (`
            <tr>
                <td>${transaction.createDate}</td>
                <td>${transaction.budgetsCategory}</td>
                <td>${transaction.payee}</td>
                <td>${transaction.amount}</td>
                <td>${transaction.accountsName}</td>
                <td><button class="btn-update" data-id="${transaction.id}">Update</button></td>
                <td><button class="btn-delete" data-id="${transaction.id}">Delete</button></td>
            </tr>
        </table>
    `);
};

// API call to retrieve all of the transactions.
$.ajax({
    url: "/transactions/all",
    type: "GET",
    success: function (response) {
        let tableTemplateString =
            `<div class="transaction">
                <table>
                    <tr>
                        <th>Date</th>
                        <th>Budget</th>
                        <th>Payee</th>
                        <th>Amount</th>
                        <th>Account</th>
                        <th>Update</th>
                        <th>Delete</th>
                    </tr>
            `;
        for (let i = 0; i < response.length; i++) {
            tableTemplateString += renderTransaction(response[i]);
        };
        $(".transactions-list").append(tableTemplateString);
    }
});

// Event listener for the delete button.
$('body').on('click', '.btn-delete', function () {
    console.log($(this).data('id'));
    // API call to delete transaction by id.
    $.ajax({
        url: `/transactions/${$(this).data('id')}`,
        type: "DELETE",
        success: function (response) {
            alert("Transaction was deleted.");
        }
    });
})

// Click event on Delete button and then execute.
// Inside click event, we need to know the id of the element.
// Render ID in button with data attribute ie. data-id="mongo-id".
// $(this).data('id')