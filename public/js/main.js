// Renders the transaction data to the DOM.
function renderTransaction(transaction) {
    return (`
        <tr>
            <td>${transaction.createDate}</td>
            <td>${transaction.budgetsCategory}</td>
            <td>${transaction.payee}</td>
            <td>$${transaction.amount}</td>
            <td>${transaction.accountsName}</td>
            <td><button id="btn-update" class="button-update" data-id="${transaction.id}">Update</button></td>
            <td><button class="button-delete" data-id="${transaction.id}">Delete</button></td>
        </tr>
    `);
};

// API call to retrieve all of the transactions.
$.ajax({
    url: "/transactions/all",
    type: "GET",
    success: function (response) {
        // Table headers for Transactions.
        let tableTemplateString =
            `<div class="transaction">
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
        for (let i = 0; i < response.length; i++) {
            tableTemplateString += renderTransaction(response[i]);
        };
        // Populates table with transactions data.
        $(".transactions-list").append(tableTemplateString + "</table>");
        // 
        addUpdateEventListener();
    }
});

// Event listener for the delete button.
$('body').on('click', '.button-delete', function () {
    console.log($(this).data('id'));
    // API call to delete transaction by id.
    $.ajax({
        url: `/transactions/${$(this).data('id')}`,
        type: "DELETE",
        success: function (response) {
            alert("Transaction was deleted.");
        }
    });
});

// Event listener for the update button.
function addUpdateEventListener() {
    // Get the modal
    var updateModal = document.getElementById('modal-update');
    // Get the button that opens the modal
    var updateButton = document.getElementById('btn-update');
    // When the user clicks on the button, open the modal 
    updateButton.onclick = function () {
        updateModal.style.display = "block";
    };
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == updateModal) {
            updateModal.style.display = "none";
        };
    };
};

// Click event on Delete button and then execute.
// Inside click event, we need to know the id of the element.
// Render ID in button with data attribute ie. data-id="mongo-id".
// $(this).data('id')