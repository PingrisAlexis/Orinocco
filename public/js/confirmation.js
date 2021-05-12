//Déclaration mode strict
"use strict";

//Déclaration des variables
let buttonReset = document.getElementById('btn-reset');
const confirmOrderId = localStorage.getItem("orderId");
const messageConfirmOrderId = document.getElementById("confirmation-page-order-id");

//Récupération des données, puis implantation dans la structure HTML
function createConfirmPage() {
  messageConfirmOrderId.innerHTML = confirmOrderId;
  const totalAmount = localStorage.getItem("orderAmount");
  const confirmationPrice = document.getElementById("confirmation-page-order-amount");
  confirmationPrice.innerHTML = `${totalAmount} €`;
}

//Suppression du storage, retour page d'accueil
function resetStorage() {
  buttonReset.addEventListener('click', function () {
    localStorage.clear();
    window.location.href = "../index.html";
  })
}

//Appel des fonctions
createConfirmPage();
resetStorage();