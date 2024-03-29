//Strict mode statement
"use strict";

//Declaration of variables
let productData;
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
let firstName = document.getElementById('user-firstname');
let lastName = document.getElementById('user-lastname');
let address = document.getElementById('user-address');
let city = document.getElementById('user-city');
let email = document.getElementById('user-email');

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

  //Hydratation of HTML elements
  selectedProductCartName.innerHTML = cartData.selectedProductName;
  selectedProductCartPicture.src = cartData.selectedProductPicture;
  selectedProductCartLensesSelected.innerHTML = cartData.selectedProductLenses;
  selectedProductCartRowPrice.innerHTML = `${cartData.selectedProductQuantity} x ${cartData.selectedProductUnityPrice}€ = ${cartData.selectedProductTotalPrice}€`;

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
  location.reload();
}

//Removing item from storage and cart
function deleteButton(selectedProductCartButtonDelete, storageKey) {
  selectedProductCartButtonDelete.addEventListener('click', function () {
    deleteSelectedProductRow(selectedProductCartButtonDelete);
    deleteCart(storageKey);
  })
}

//Check of the form data, then calling a function (line 133)
function controlForm() {
  let buttonOrder = document.getElementById('btn-order');
  buttonOrder.addEventListener('click', function (event) {
    event.preventDefault();
    lastName = lastName.value;
    firstName = firstName.value;
    address = address.value;
    city = city.value;
    email = email.value;
    if (lastName, firstName, address, city, email != "" && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      userAndProductData();
    } else {
      alert("Please fill your contact details.");
    }
  })
}

//Push product Id to products array
function addIdProducts(cartData) {
  products.push(cartData.selectedProductId);
}

//Recovery of contact object and products array, then calling a function
function userAndProductData() {
  contact = { lastName, firstName, address, city, email };
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
      localStorage.setItem("orderAmount", cartTotalAmount);
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
      addIdProducts(cartData);
      structureAndHydrateProductCart(storageKey);
      calculTotalPrice();
    }
  }
}

//Checking if the price is the same between user's storage and api
async function controlPrice() {
  let response = await fetch("http://localhost:3000/api/cameras");
  if (response.ok) {
    productData = await response.json();
    for (let i = 0; i < localStorage.length; i++) {
      if (cartData.selectedProductId === productData[i]._id && cartData.selectedProductUnityPrice !== productData[i].price / 100) {
        alert("Welcome back! Sorry about that but prices have changed, your have to shop again...");
        localStorage.clear();
        window.location.href = "../index.html";
      }
      else {
        console.log("The products prices haven't changed between user's storage and api.");
      }
    }
  }
}

//Calling the functions
controlPrice();
createProductsCart();
controlForm();