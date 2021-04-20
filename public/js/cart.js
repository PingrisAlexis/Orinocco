"use strict";

let getSelectedProductCart = localStorage.getItem('selectedProductCart');
let cartData = JSON.parse(getSelectedProductCart);
console.log(localStorage);
console.log(cartData);
function createProductsCart() {

  if (cartData === null) {
    alert("Votre panier est actuellement vide!");
  }
  else {
    for (let i = 0; i < cartData.length; i++) {
      // Initialisation HTML structure
      let selectedProductCartContenair = document.getElementById("add-products-cart-contenair");
      let selectedProductCartTbody = document.createElement("tbody");

      let selectedProductCartTr = document.createElement("tr");
      let selectedProductCartName = document.createElement("th");
      let selectedProductCartPicture = document.createElement("img");
      let selectedProductCartLensesSelect = document.createElement("select");
      let selectedProductCartPrice = document.createElement("th");
      // Get Selected Products Datas
      selectedProductCartName.innerHTML = cartData[i].selectedProductName;
      selectedProductCartPicture.src = cartData[i].selectedProductPicture;
      selectedProductCartPrice.innerHTML = cartData[i].selectedProductPrice;
      // Create and Get Selected Product Lenses
      for (let k = 0; k < cartData[i].selectedProductLenses.length; k++) {
        let selectedProductCartLensesOption = document.createElement("option")
        selectedProductCartLensesOption.innerHTML = cartData[i].selectedProductLenses[k];
        selectedProductCartLensesSelect.appendChild(selectedProductCartLensesOption);
      }

      selectedProductCartContenair.appendChild(selectedProductCartTbody);
      selectedProductCartTbody.appendChild(selectedProductCartTr);
      selectedProductCartTr.appendChild(selectedProductCartName);
      selectedProductCartTr.appendChild(selectedProductCartLensesSelect);
      selectedProductCartName.appendChild(selectedProductCartPicture);

      selectedProductCartTr.appendChild(selectedProductCartPrice);
    }



  }
}
createProductsCart()


// let codePostal = /^(([0-8][0-9])|(9[0-5]))[0-9]{3}$/;

// function checkMail(email) {
//   return email.match(/^[_a - z0 - 9 -] + (.[_a - z0 - 9 -] +)*@[a - z0 - 9 -] + (.[a - z0 - 9 -] +)*(.[a - z]{
//       2, 3}) $ /);
// }

// console.log(checkMail);
