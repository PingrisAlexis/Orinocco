//Strict mode statement
"use strict";

//Declaration of variables
let buttonReset = document.getElementById('btn-reset');
const confirmOrderId = localStorage.getItem("orderId");
const messageConfirmOrderId = document.getElementById("confirmation-page-order-id");

//Hydrate the HTML structure
function createConfirmPage() {
  messageConfirmOrderId.innerHTML = confirmOrderId;
  const totalAmount = localStorage.getItem("orderAmount");
  const confirmationPrice = document.getElementById("confirmation-page-order-amount");
  confirmationPrice.innerHTML = `${totalAmount} €`;
}

//Removing the product from the storage, and redirection to the home page
function resetStorage() {
  buttonReset.addEventListener('click', function () {
    localStorage.clear();
    window.location.href = "../index.html";
  })
}

//Calling the functions
createConfirmPage();
resetStorage();