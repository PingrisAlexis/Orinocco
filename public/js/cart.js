//Strict mode statement
"use strict";

//Declaration of variables
let cartData;
let arrayPrice = [];
let products = [];
let contact = {};
let orderData;
let cartTotalAmount;
let selectedProductCartContenair;
let selectedProductCartBlock;
let selectedProductCartTr;
let selectedProductCartName;
let selectedProductCartPicture;
let selectedProductCartLensesSelected;
let selectedProductCartRowPrice;
let selectedProductCartButtonDeleteColumn;
let selectedProductCartButtonDelete;
let selectedProductCartTotalAmount;
const firstName = document.getElementById('user-firstname');
const lastName = document.getElementById('user-lastname');
const address = document.getElementById('user-address');
const city = document.getElementById('user-city');
const email = document.getElementById('user-email');
let lastNameValue;
let firstNameValue;
let addressValue;
let cityValue;
let emailValue;

//Creation of a class for the structure of the contact object
class contactData {
  constructor(lastName, firstName, address, city, email) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.address = address;
    this.city = city;
    this.email = email;
  }
}

//Hydration of the HTML structure
function hydrateCartPage() {
  selectedProductCartName.innerHTML = cartData.selectedProductName;
  selectedProductCartPicture.src = cartData.selectedProductPicture;
  selectedProductCartLensesSelected.innerHTML = cartData.selectedProductLenses;
  selectedProductCartRowPrice.innerHTML = `${cartData.selectedProductQuantity} x ${cartData.selectedProductUnityPrice}€ = ${cartData.selectedProductTotalPrice}€`;
}

//Creation and hydratation of HTML elements
function structureAndHydrateProductCart(storageKey) {
  //Creation of HTML elements
  selectedProductCartContenair = document.getElementById("selected-product-cart-contenair");
  selectedProductCartBlock = document.createElement("tbody");
  selectedProductCartTr = document.createElement("tr");
  selectedProductCartName = document.createElement("th");
  selectedProductCartPicture = document.createElement("img");
  selectedProductCartLensesSelected = document.createElement("th");
  selectedProductCartRowPrice = document.createElement("th");
  selectedProductCartButtonDeleteColumn = document.createElement("th");
  selectedProductCartButtonDelete = document.createElement("button");
  selectedProductCartTotalAmount = document.getElementById("cart-total-amount");
  selectedProductCartButtonDelete.id = "selected-product-cart-button-delete";

  //Calling of the function
  hydrateCartPage();

  //Creation of HTML nodes
  selectedProductCartContenair.appendChild(selectedProductCartBlock);
  selectedProductCartBlock.appendChild(selectedProductCartTr);
  selectedProductCartTr.appendChild(selectedProductCartName);
  selectedProductCartName.appendChild(selectedProductCartButtonDelete);
  selectedProductCartName.appendChild(selectedProductCartPicture);
  selectedProductCartTr.appendChild(selectedProductCartLensesSelected);
  selectedProductCartTr.appendChild(selectedProductCartRowPrice);
  selectedProductCartTr.appendChild(selectedProductCartButtonDeleteColumn);
  selectedProductCartButtonDeleteColumn.appendChild(selectedProductCartButtonDelete);

  //Creation of a delete product button for each line in the shopping cart, and in the local storage
  deleteButton(selectedProductCartButtonDelete, storageKey);
}

//Calculate of the total cost, then hydratatation of HTML structure
function calculTotalPrice() {
  arrayPrice.push(cartData.selectedProductTotalPrice);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  cartTotalAmount = arrayPrice.reduce(reducer, 0);

  selectedProductCartTotalAmount.innerHTML = `${cartTotalAmount} €`;
}

//Removing the product from the HTML structure
function deleteSelectedProductRow(selectedProductCartButtonDelete) {
  let deleteSelectedProduct = selectedProductCartButtonDelete.parentNode.parentNode;
  deleteSelectedProduct.parentNode.removeChild(deleteSelectedProduct);
}

//Removing the product from the storage
function deleteCart(i) {
  localStorage.removeItem(i);
  console.log(i);
  location.reload();
}

//Ecoute de la demande de suppression des articles, suppression de la ligne panier et du storage via la clé du produit
function deleteButton(selectedProductCartButtonDelete, storageKey) {
  selectedProductCartButtonDelete.addEventListener('click', function () {
    deleteSelectedProductRow(selectedProductCartButtonDelete);
    deleteCart(storageKey);
  })
}

//Check of the form data, then calling a function (line 133)
function controlForm() {
  let buttonOrder = document.getElementById('btn-order');
  buttonOrder.addEventListener('click', function () {
    lastNameValue = lastName.value;
    firstNameValue = firstName.value;
    addressValue = address.value;
    cityValue = city.value;
    emailValue = email.value;
    if (lastNameValue, firstNameValue, addressValue, cityValue, emailValue != "" && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailValue)) {
      userAndProductData();
      localStorage.setItem("orderAmount", cartTotalAmount);
    } else {
      alert("Veuillez renseigner vos coordonnées.");
    }
  })
}

//Recovery of customer and product data, then calling a function (line 140)
function userAndProductData() {
  contact = new contactData(lastNameValue, firstNameValue, addressValue, cityValue, emailValue);
  orderData = JSON.stringify({ contact, products });
  postForm(orderData);
}

//API request, method post. Recovery an order id, and redirection to confirmation page
async function postForm(orderData) {
  try {
    let response = await fetch("http://localhost:3000/api/cameras/order", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: orderData,
    });
    if (response.ok) {
      let responseId = await response.json();
      let orderId = responseId.orderId;
      localStorage.setItem("orderId", orderId);
      window.location.href = "confirmation.html";
    } else {
      console.error('Retour du serveur : ', response.status);
    }
  }
  catch (e) {
    console.log(e);
  }
}

//Recovery of product data, and call the functions
function createProductsCart() {
  if (localStorage.length === 0) {
    alert("Your shopping cart is currently empty, you will be redirected to the home page!");
    window.location.href = "../index.html";
  }
  else {
    for (let i = 0; i < localStorage.length; i++) {
      let storageKey = localStorage.key(i);
      let storageJson = localStorage.getItem(storageKey);
      cartData = JSON.parse(storageJson);

      structureAndHydrateProductCart(storageKey, cartData);
      calculTotalPrice();
    }
  }
}

//Calling the functions
createProductsCart();
controlForm();
