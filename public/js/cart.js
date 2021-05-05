"use strict";
let arrayPrice = [];
let selectedProductCartContenair;
let selectedProductCartBlock;
let selectedProductCartTr;
let selectedProductCartName;
let selectedProductCartPicture;
let selectedProductCartLensesSelected;
let selectedProductCartRowPrice;
let selectedProductCartButtonDeleteColumn;
let selectedProductCartButtonDelete;
let selectedProductCartFinalPrice;


let cartData;
createProductsCart();
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
function createProductsCart(cartData) {
  if (localStorage === null) {
    alert("Votre panier est actuellement vide!");
    console.log(alert);
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
      //Initialisation HTML structure
      selectedProductCartContenair = document.getElementById("selected-product-cart-contenair");
      selectedProductCartBlock = document.createElement("tbody");
      selectedProductCartTr = document.createElement("tr");
      selectedProductCartName = document.createElement("th");
      selectedProductCartPicture = document.createElement("img");
      selectedProductCartLensesSelected = document.createElement("th");
      selectedProductCartRowPrice = document.createElement("th");
      selectedProductCartButtonDeleteColumn = document.createElement("th");
      selectedProductCartButtonDelete = document.createElement("button");
      selectedProductCartFinalPrice = document.getElementById("cart-total-price");
      //Incrémentation des données dans la structure HTML
      selectedProductCartName.innerHTML = cartData.selectedProductName;
      selectedProductCartPicture.src = cartData.selectedProductPicture;
      selectedProductCartLensesSelected.innerHTML = cartData.selectedProductLenses;
      selectedProductCartRowPrice.innerHTML = `${cartData.selectedProductQuantity} x ${cartData.selectedProductPriceForOne}€ = ${cartData.selectedProductPrice}€`;

      selectedProductCartContenair.appendChild(selectedProductCartBlock);
      selectedProductCartBlock.appendChild(selectedProductCartTr);
      selectedProductCartTr.appendChild(selectedProductCartName);
      selectedProductCartName.appendChild(selectedProductCartButtonDelete);
      selectedProductCartName.appendChild(selectedProductCartPicture);
      selectedProductCartTr.appendChild(selectedProductCartLensesSelected);
      selectedProductCartTr.appendChild(selectedProductCartRowPrice);

      //Bouton effacer ligne panier html et storage
      selectedProductCartButtonDelete.id = "selected-product-cart-button-delete";
      selectedProductCartTr.appendChild(selectedProductCartButtonDeleteColumn);
      selectedProductCartButtonDeleteColumn.appendChild(selectedProductCartButtonDelete);
      selectedProductCartButtonDelete.addEventListener('click', function (event) {
        deleteSelectedProduct(selectedProductCartButtonDelete);
        deleteBasket(storageKey);
        event.preventDefault();
      })
      //Calcul du prix des produits
      arrayPrice.push(cartData.selectedProductPrice);

      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      const cartTotalPrice = arrayPrice.reduce(reducer, 0);

      selectedProductCartFinalPrice.innerHTML = `${cartTotalPrice} €`;
      const orderButton = document.getElementById("btn-order");
      orderButton.addEventListener('click', e => {
        e.preventDefault();
        sendOrderForm();
      });

    }
  }
}
function sendOrderForm() {
  let contact = {
    lastName: document.getElementById("user-name").value,
    firstName: document.getElementById("user-firstname").value,
    address: document.getElementById("user-adress").value,
    city: document.getElementById("user-city").value,
    postCode: document.getElementById("user-postcode").value,
    email: document.getElementById("user-mail").value,
  };

  console.log(contact);
  // let products = [];
  if (localStorage !== null) {
    let productTab = JSON.parse(localStorage);
    console.log(localStorage);
    console.log(productTab)
    // productTab.forEach
  }

  // let contactItems = JSON.stringify({
  //   contact, products
  // })
  // console.log(contactItems);
};




