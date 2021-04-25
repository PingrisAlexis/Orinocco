"use strict";

let getSelectedProductCart = localStorage.getItem('selectedProductCart');
let cartData = JSON.parse(getSelectedProductCart);
console.log(localStorage.length);
console.log(cartData);



function deleteSelectedProduct(selectedProductCartButtonDelete) {
  var deleteProductConfirmationMessage = confirm("Supprimer l'article de votre panier?");

  if (deleteProductConfirmationMessage == true) {

    var deleteSelectedProduct = selectedProductCartButtonDelete.parentNode.parentNode;
    deleteSelectedProduct.parentNode.removeChild(deleteSelectedProduct);


  }
  else {
    alert("L'article est conservé dans votre panier!");
  }
}



function createProductsCart() {

  if (cartData === null) {
    alert("Votre panier est actuellement vide!");
  }
  else {
    for (let i = 0; i < cartData.length; i++) {
      // Initialisation HTML structure
      let selectedProductCartContenair = document.getElementById("selected-product-cart-contenair");

      let selectedProductCartBlock = document.createElement("tbody");
      let selectedProductCartTr = document.createElement("tr");
      let selectedProductCartName = document.createElement("th");
      let selectedProductCartPicture = document.createElement("img");
      let selectedProductCartLensesSelected = document.createElement("th");
      let selectedProductCartPrice = document.createElement("th");
      let selectedProductCartQuantity = document.createElement("input");
      let selectedProductCartButtonDelete = document.createElement("button");

      let selectedProductCartTotalPrice = document.createElement("th");
      // Get Selected Products Datas
      selectedProductCartName.innerHTML = cartData[i].selectedProductName;
      selectedProductCartPicture.src = cartData[i].selectedProductPicture;
      selectedProductCartLensesSelected.innerHTML = cartData[i].selectedProductLenses;
      selectedProductCartPrice.innerHTML = cartData[i].selectedProductPrice;

      selectedProductCartContenair.appendChild(selectedProductCartBlock);
      selectedProductCartBlock.appendChild(selectedProductCartTr);
      selectedProductCartTr.appendChild(selectedProductCartName);
      selectedProductCartName.appendChild(selectedProductCartButtonDelete);
      selectedProductCartName.appendChild(selectedProductCartPicture);
      selectedProductCartTr.appendChild(selectedProductCartLensesSelected);
      selectedProductCartTr.appendChild(selectedProductCartPrice);
      selectedProductCartTr.appendChild(selectedProductCartQuantity);
      selectedProductCartTr.appendChild(selectedProductCartTotalPrice);
      selectedProductCartTr.appendChild(selectedProductCartButtonDelete);

      selectedProductCartButtonDelete.addEventListener('click', function (event) {
        deleteSelectedProduct(selectedProductCartButtonDelete);
        event.preventDefault();
      })





    }
  }
}


createProductsCart();
