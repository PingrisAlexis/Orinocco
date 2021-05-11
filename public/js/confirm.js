function addConfirmationOrder() {
  const confirmationId = localStorage.getItem("orderId");
  const messageConfirmation = document.getElementById("orderId");
  messageConfirmation.innerHTML = "Merci pour votre commande n° " + confirmationId;
  const totalPrice = localStorage.getItem("totalOrder");
  const confirmationPrice = document.getElementById("total-price");
  confirmationPrice.innerHTML = "Prix total : " + totalPrice + " $";
}


// function resetOrder() {
//   buttonHome = document.getElementById('btn-confirmation');
//   buttonHome.addEventListener('click', function () {
//     localStorage.removeItem("orderConfirmationId");
//     localStorage.removeItem('basketContent');
//     localStorage.removeItem('totalOrder');
//     window.location.href = "../index.html";
//   })
// }


addConfirmationOrder();
// resetOrder();