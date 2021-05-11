"use strict";

let productPageContenair = document.getElementById("product-page-contenair");
let newProductCard = document.createElement("figure");
let newProductPicture = document.createElement("img");
let newProductInformations = document.createElement("figcaption");
let newProductName = document.createElement("h2");
let newProductDescription = document.createElement("p");
let newProductLensesSelect = document.createElement("select");
let newProductQuantitySelect = document.createElement("select");
let newProductQuantityOptionOne = document.createElement("option");
let newProductQuantityOptionTwo = document.createElement("option");
let newProductQuantityOptionThree = document.createElement("option");
let newProductQuantityOptionFour = document.createElement("option");
let newProductQuantityOptionFive = document.createElement("option");
let newProductPrice = document.createElement("span");
let arrayPrice = [];
let productAmount;
let buttonAddToCart = document.getElementById('btn-add-to-cart');

productPageContenair.appendChild(newProductCard);
newProductCard.appendChild(newProductPicture);
newProductCard.appendChild(newProductInformations);
newProductInformations.appendChild(newProductName);
newProductInformations.appendChild(newProductDescription);
productPageContenair.appendChild(newProductCard);
newProductCard.appendChild(newProductPicture);
newProductCard.appendChild(newProductInformations);
newProductInformations.appendChild(newProductName);
newProductInformations.appendChild(newProductDescription);
newProductInformations.appendChild(newProductLensesSelect);
newProductInformations.appendChild(newProductPrice);

function getProductsIdInUrl() {
  let urlSearch = new URLSearchParams(window.location.search);

  return urlSearch.get("id");
}
let idProduct = getProductsIdInUrl();

//Gestion du montant total 
function productTotalPrice(oneProductData) {
  let productQuantity = newProductQuantitySelect.options[newProductQuantitySelect.selectedIndex].value;
  let productPrice = oneProductData.price / 100;
  productAmount = Number(productPrice * productQuantity);
  newProductPrice.innerHTML = `${productAmount} €`;
  console.log(productAmount);
}


//Gestion des lentilles 
function createLenses(product) {
  //Récupération des lentilles, puis création de la structure HTML
  for (let i = 0; i < product.lenses.length; i++) {
    let newProductLenses = document.createElement("option");
    newProductLenses.innerHTML = product.lenses[i];
    newProductLensesSelect.appendChild(newProductLenses);
  }
}
//Ecoute de la lentille selectionée
let selectedLenses = document.querySelector('select');
function selectedLensesValue() {
  selectedLenses.addEventListener('change', function () {
    selectedLenses.value;
  })
}
//Gestion quantité article
function setQuantity() {
  // Création structure HTML gestion quantité
  newProductInformations.appendChild(newProductQuantitySelect);
  newProductQuantitySelect.appendChild(newProductQuantityOptionOne);
  newProductQuantitySelect.appendChild(newProductQuantityOptionTwo);
  newProductQuantitySelect.appendChild(newProductQuantityOptionThree);
  newProductQuantitySelect.appendChild(newProductQuantityOptionFour);
  newProductQuantitySelect.appendChild(newProductQuantityOptionFive);
  // Création du <select> et du nombre d'articles à ajouter
  newProductQuantitySelect.id = "selected-product-cart-quantity-select";
  newProductQuantityOptionOne.value = "1";
  newProductQuantityOptionOne.text = "1";
  newProductQuantityOptionTwo.value = "2";
  newProductQuantityOptionTwo.text = "2";
  newProductQuantityOptionThree.value = "3";
  newProductQuantityOptionThree.text = "3";
  newProductQuantityOptionFour.value = "4";
  newProductQuantityOptionFour.text = "4";
  newProductQuantityOptionFive.value = "5";
  newProductQuantityOptionFive.text = "5";
}

function addToCart(productData) {
  for (let i = 0; i < productData.length; i++) {
    if (productData[i]._id === idProduct) {
      buttonAddToCart.addEventListener('click', function () {
        let selectedProduct = {
          selectedProductId: productData[i]._id,
          selectedProductName: productData[i].name,
          selectedProductPicture: productData[i].imageUrl,
          selectedProductLenses: selectedLenses.value,
          selectedProductTotalPrice: productAmount,
          selectedProductQuantity: newProductQuantitySelect.options[newProductQuantitySelect.selectedIndex].value,
          selectedProductUnityPrice: productData[i].price / 100,
        }
        localStorage.setItem(i, JSON.stringify(selectedProduct));
        console.log(selectedProduct);
      }
      )
    }
  }
}

// PRODUCTS PAGES CREATION //
function createProductsPages(productData) {
  for (let i = 0; i < productData.length; i++) {
    if (productData[i]._id === idProduct) {
      newProductPicture.src = productData[i].imageUrl;
      newProductDescription.innerHTML = productData[i].description;
      newProductName.innerHTML = productData[i].name;
      createLenses(productData[i]);
      setQuantity();
      productTotalPrice(productData[i]);
      newProductQuantitySelect.addEventListener('change', function () {
        productTotalPrice(productData[i]);
      })
    }
  }
}



// REQUEST API //

async function getProducts() {
  try {
    let response = await fetch("http://localhost:3000/api/cameras");
    console.log(response);
    if (response.ok) {
      let productsData = await response.json();
      console.log(productsData);

      createProductsPages(productsData);
      addToCart(productsData);

    }
    else {
      console.log(reponse.status)
    }
  }
  catch (err) {
    console.log('erreur : ' + err);
  }
}
getProducts();
selectedLensesValue();