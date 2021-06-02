//Strict mode statement
"use strict";

//Creating an empty table for prices
let arrayPrice = [];

//Declaration of variables
let productAmount;
let buttonAddToCart = document.getElementById('btn-add-to-cart');
let idProduct = getProductsIdInUrl();

//Declaration of variables and creation of HTML elements
let productPageContenair = document.getElementById("product-page-contenair");
let newProductCard = document.createElement("figure");
let newProductPicture = document.createElement("img");
let newProductInformations = document.createElement("figcaption");
let newProductName = document.createElement("h2");
let newProductDescription = document.createElement("p");
let newProductLensesSelect = document.createElement("select");
let newProductQuantitySelect = document.createElement("select");
let newProductPrice = document.createElement("span");

//Creation of HTML nodes
productPageContenair.appendChild(newProductCard);
newProductCard.appendChild(newProductPicture);
newProductCard.appendChild(newProductInformations);
newProductInformations.appendChild(newProductName);
newProductInformations.appendChild(newProductDescription);
newProductInformations.appendChild(newProductLensesSelect);
newProductInformations.appendChild(newProductPrice);
newProductInformations.appendChild(newProductQuantitySelect);

//Hydration of the HTML structure
function hydrateProductPage(productData) {
  newProductPicture.src = productData.imageUrl;
  newProductDescription.innerHTML = productData.description;
  newProductName.innerHTML = productData.name;
}

//Recovery of the lenses, then hydratation, and creation of the HTML structure
function getLenses(product) {
  for (let i = 0; i < product.lenses.length; i++) {
    let newProductLenses = document.createElement("option");
    newProductLenses.innerHTML = product.lenses[i];
    newProductLensesSelect.appendChild(newProductLenses);
  }
}

//Listening to the selected lens value
let selectedLenses = document.querySelector('select');
function selectedLensesValue() {
  selectedLenses.addEventListener('change', function () {
    selectedLenses.value;
  })
}

//Calculation of the total amount, then hydrate of the HTML structure
function productTotalAmount(oneProductData) {
  let productQuantity = newProductQuantitySelect.options[newProductQuantitySelect.selectedIndex].value;
  let productPrice = oneProductData.price / 100;
  productAmount = Number(productPrice * productQuantity);
  newProductPrice.innerHTML = `${productAmount} €`;
}

//Creation of the quantity choice, then listening and hydratation of the HTML structure
function productQuantity() {
  let productQuantity = ["1", "2", "3", "4", "5"];

  for (let i = 0; i < productQuantity.length; i++) {
    let newProductQuantityOption = document.createElement("option");
    newProductQuantityOption.value = productQuantity[i];
    newProductQuantityOption.text = productQuantity[i];
    newProductQuantitySelect.appendChild(newProductQuantityOption);
  }
}

//Recovery of the ID in the URL to dynamically redirect to the corresponding product page
function getProductsIdInUrl() {
  let urlSearch = new URLSearchParams(window.location.search);

  return urlSearch.get("id");
}

//If the item is added to the shopping cart, retrieve the product data according to the corresponding ID, then send to localStorage
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
        localStorage.setItem(i + selectedLenses.value, JSON.stringify(selectedProduct));
      }
      )
    }
  }
}

//Activation of the functions according to the ID 
function createProductsPages(productData) {
  for (let i = 0; i < productData.length; i++) {
    if (productData[i]._id === idProduct) {
      hydrateProductPage(productData[i]);
      getLenses(productData[i]);
      productQuantity();
      productTotalAmount(productData[i]);
      newProductQuantitySelect.addEventListener('change', function () {
        productTotalAmount(productData[i]);
      })
    }
  }
}

//API request: Product data retrieval
async function getProducts() {
  try {
    let response = await fetch("http://localhost:3000/api/cameras");
    console.log(response);
    if (response.ok) {
      let productsData = await response.json();
      createProductsPages(productsData);
      addToCart(productsData);
      selectedLensesValue();

    }
    else {
      console.log(reponse.status)
    }
  }
  catch (err) {
    console.log('erreur : ' + err);
  }
}

//Calling the function
getProducts();