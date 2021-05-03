"use strict";
// Bouton supprimer article
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

// suppression de l'article du storage
function deleteBasket(i) {
  localStorage.removeItem(i);
  console.log(i);
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
      const cartData = JSON.parse(storageJson);
      console.log(cartData);
      console.log(typeof localStorage.length);
      // Initialisation HTML structure
      let selectedProductCartContenair = document.getElementById("selected-product-cart-contenair");

      let selectedProductCartBlock = document.createElement("tbody");
      let selectedProductCartTr = document.createElement("tr");
      let selectedProductCartName = document.createElement("th");
      let selectedProductCartPicture = document.createElement("img");
      let selectedProductCartLensesSelected = document.createElement("th");
      let selectedProductCartRowPrice = document.createElement("th");
      let selectedProductCartQuantityColumn = document.createElement("th");
      let selectedProductCartQuantitySelect = document.createElement("select");
      let selectedProductCartQuantityOptionOne = document.createElement("option");
      let selectedProductCartQuantityOptionTwo = document.createElement("option");
      let selectedProductCartQuantityOptionThree = document.createElement("option");
      let selectedProductCartQuantityOptionFour = document.createElement("option");
      let selectedProductCartQuantityOptionFive = document.createElement("option");
      let selectedProductCartRowTotalPrice = document.createElement("th");
      let selectedProductCartButtonDeleteColumn = document.createElement("th");
      let selectedProductCartButtonDelete = document.createElement("button");
      let selectedProductCartFinalPrice = document.getElementById("cart-total-price");
      console.log(selectedProductCartFinalPrice);
      // Incrémentation des données dans la structure HTML
      selectedProductCartName.innerHTML = cartData.selectedProductName;
      selectedProductCartPicture.src = cartData.selectedProductPicture;
      selectedProductCartLensesSelected.innerHTML = cartData.selectedProductLenses;
      selectedProductCartRowPrice.innerHTML = `${cartData.selectedProductPrice} €`;

      console.log(typeof cartData.selectedProductPrice);
      selectedProductCartContenair.appendChild(selectedProductCartBlock);
      selectedProductCartBlock.appendChild(selectedProductCartTr);
      selectedProductCartTr.appendChild(selectedProductCartName);
      selectedProductCartName.appendChild(selectedProductCartButtonDelete);
      selectedProductCartName.appendChild(selectedProductCartPicture);
      selectedProductCartTr.appendChild(selectedProductCartLensesSelected);
      selectedProductCartTr.appendChild(selectedProductCartRowPrice);
      selectedProductCartTr.appendChild(selectedProductCartQuantityColumn);

      // Création selection quantité de produits
      selectedProductCartRowPrice.id = "selected-product-cart-price";
      selectedProductCartRowTotalPrice.id = "selected-product-cart-total-price";

      selectedProductCartQuantitySelect.id = "selected-product-cart-quantity-select";
      selectedProductCartQuantityOptionOne.value = "1";
      selectedProductCartQuantityOptionOne.text = "1";
      selectedProductCartQuantityOptionTwo.value = "2";
      selectedProductCartQuantityOptionTwo.text = "2";
      selectedProductCartQuantityOptionThree.value = "3";
      selectedProductCartQuantityOptionThree.text = "3";
      selectedProductCartQuantityOptionFour.value = "4";
      selectedProductCartQuantityOptionFour.text = "4";
      selectedProductCartQuantityOptionFive.value = "5";
      selectedProductCartQuantityOptionFive.text = "5";

      selectedProductCartQuantityColumn.appendChild(selectedProductCartQuantitySelect);
      selectedProductCartQuantitySelect.appendChild(selectedProductCartQuantityOptionOne);
      selectedProductCartQuantitySelect.appendChild(selectedProductCartQuantityOptionTwo);
      selectedProductCartQuantitySelect.appendChild(selectedProductCartQuantityOptionThree);
      selectedProductCartQuantitySelect.appendChild(selectedProductCartQuantityOptionFour);
      selectedProductCartQuantitySelect.appendChild(selectedProductCartQuantityOptionFive);

      // Bouton effacer ligne panier html et storage
      selectedProductCartButtonDelete.id = "selected-product-cart-button-delete";
      selectedProductCartTr.appendChild(selectedProductCartButtonDeleteColumn);
      selectedProductCartButtonDeleteColumn.appendChild(selectedProductCartButtonDelete);
      selectedProductCartButtonDelete.addEventListener('click', function (event) {
        deleteSelectedProduct(selectedProductCartButtonDelete);
        deleteBasket(storageKey);
        event.preventDefault();
      })

      // calcul montant ligne panier
      selectedProductCartTr.appendChild(selectedProductCartRowTotalPrice);
      function productTotalPrice() {
        let productQuantity = selectedProductCartQuantitySelect.options[selectedProductCartQuantitySelect.selectedIndex].value;
        let productPrice = cartData.selectedProductPrice;
        let productAmount = Number(productPrice * productQuantity);

        selectedProductCartRowTotalPrice.innerHTML = `${productAmount} €`;
        selectedProductCartFinalPrice.innerHTML = productAmount;

      }
      productTotalPrice();
      selectedProductCartQuantitySelect.addEventListener('change', function () {
        productTotalPrice();
        console.log(localStorage);
      })
    }
  }
}

createProductsCart();