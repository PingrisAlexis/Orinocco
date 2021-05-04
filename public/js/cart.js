"use strict";
let arrayPrice = [];
let cartData;
let selectedProductCartFinalPrice;

// Bouton supprimer article
function deleteSelectedProduct(selectedProductCartButtonDelete) {
  let deleteSelectedProduct = selectedProductCartButtonDelete.parentNode.parentNode;
  deleteSelectedProduct.parentNode.removeChild(deleteSelectedProduct);
}

// suppression de l'article du storage
function deleteBasket(i) {
  localStorage.removeItem(i);
  console.log(i);
  location.reload();
}



// création de la page 
function createProductsCart() {
  if (localStorage === null) {
    alert("Votre panier est actuellement vide!");
  }
  else {
    for (let i = 0; i < localStorage.length; i++) {
      // Récupération des données stockées des produits ajoutés au panier
      let storageKey = localStorage.key(i);
      console.log(storageKey);
      let storageJson = localStorage.getItem(storageKey);
      console.log(storageJson);
      cartData = JSON.parse(storageJson);
      console.log(cartData);
      // Initialisation HTML structure
      let selectedProductCartContenair = document.getElementById("selected-product-cart-contenair");

      let selectedProductCartBlock = document.createElement("tbody");
      let selectedProductCartTr = document.createElement("tr");
      let selectedProductCartName = document.createElement("th");
      let selectedProductCartPicture = document.createElement("img");
      let selectedProductCartLensesSelected = document.createElement("th");
      let selectedProductCartRowPrice = document.createElement("th");
      let selectedProductCartButtonDeleteColumn = document.createElement("th");
      let selectedProductCartButtonDelete = document.createElement("button");
      let selectedProductCartFinalPrice = document.getElementById("cart-total-price");
      // Incrémentation des données dans la structure HTML
      selectedProductCartName.innerHTML = cartData.selectedProductName;
      selectedProductCartPicture.src = cartData.selectedProductPicture;
      selectedProductCartLensesSelected.innerHTML = cartData.selectedProductLenses;
      selectedProductCartRowPrice.innerHTML = `${cartData.selectedProductPrice} €`;

      selectedProductCartContenair.appendChild(selectedProductCartBlock);
      selectedProductCartBlock.appendChild(selectedProductCartTr);
      selectedProductCartTr.appendChild(selectedProductCartName);
      selectedProductCartName.appendChild(selectedProductCartButtonDelete);
      selectedProductCartName.appendChild(selectedProductCartPicture);
      selectedProductCartTr.appendChild(selectedProductCartLensesSelected);
      selectedProductCartTr.appendChild(selectedProductCartRowPrice);

      // Bouton effacer ligne panier html et storage
      selectedProductCartButtonDelete.id = "selected-product-cart-button-delete";
      selectedProductCartTr.appendChild(selectedProductCartButtonDeleteColumn);
      selectedProductCartButtonDeleteColumn.appendChild(selectedProductCartButtonDelete);
      selectedProductCartButtonDelete.addEventListener('click', function (event) {
        deleteSelectedProduct(selectedProductCartButtonDelete);
        deleteBasket(storageKey);
        event.preventDefault();
      })


      arrayPrice.push(cartData.selectedProductPrice);

      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const cartTotalPrice = arrayPrice.reduce(reducer, 0);

      // // localStorage.setItem("cartTotalPrice", JSON.stringify(cartTotalPrice));
      selectedProductCartFinalPrice.innerHTML = `${cartTotalPrice} €`;
      location.reload;
      console.log(cartData.selectedProductPrice);
      console.log(cartTotalPrice);
      console.log(arrayPrice);

    }

  }
}

createProductsCart();
