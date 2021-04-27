"use strict";


function deleteSelectedProduct(selectedProductCartButtonDelete) {
  let deleteProductConfirmationMessage = confirm("Supprimer l'article de votre panier?");

  if (deleteProductConfirmationMessage == true) {
    let deleteSelectedProduct = selectedProductCartButtonDelete.parentNode.parentNode;
    deleteSelectedProduct.parentNode.removeChild(deleteSelectedProduct);
  }
  else {
    alert("L'article est conservé dans votre panier!");
  }
}

function deleteBasket(i) {
  localStorage.removeItem(i);
  console.log(i);
}

function createProductsCart() {
  // let storageJson;
  // let storageKey;
  if (localStorage === null) {
    alert("Votre panier est actuellement vide!");
  }
  else {
    for (let i = 0; i < localStorage.length; i++) {
      let storageKey = localStorage.key(i);
      console.log(storageKey)
      let storageJson = localStorage.getItem(storageKey);
      console.log(storageJson);
      const cartData = JSON.parse(storageJson);
      console.log(cartData);
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
      selectedProductCartName.innerHTML = cartData.selectedProductName;
      selectedProductCartPicture.src = cartData.selectedProductPicture;
      selectedProductCartLensesSelected.innerHTML = cartData.selectedProductLenses;
      selectedProductCartPrice.innerHTML = cartData.selectedProductPrice;

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
        deleteBasket(storageKey);
        event.preventDefault();
      })

    }
  }
}


createProductsCart();