// "use strict";s
let cartData;
let arrayPrice = [];
let products = [];
let contact = {};
let orderData;
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

//Création stucture de "contact"
class contactData {
  constructor(name, surname, adress, city, email) {
    this.firstName = name;
    this.lastName = surname;
    this.address = adress;
    this.city = city;
    this.email = email;
  }
}

//Récuperation des donnée du storage + boucle sur nombre produits
function createProductsCart() {
  if (localStorage === null) {
    alert("Votre panier est actuellement vide!");
    console.log(alert);
  }
  else {
    for (let i = 0; i < localStorage.length; i++) {
      // Récupération des données stockées des produits ajoutés au panier
      let storageKey = localStorage.key(i);
      let storageJson = localStorage.getItem(storageKey);
      cartData = JSON.parse(storageJson);

      structureAndHydrateProductCart(storageKey, cartData);
      calculTotalPrice();
      productData(cartData);
    }
  }
}

// Incrémentation des données dans la structure HTML
function hydrateProductPage() {
  selectedProductCartName.innerHTML = cartData.selectedProductName;
  selectedProductCartPicture.src = cartData.selectedProductPicture;
  selectedProductCartLensesSelected.innerHTML = cartData.selectedProductLenses;
  selectedProductCartRowPrice.innerHTML = `${cartData.selectedProductQuantity} x ${cartData.selectedProductUnityPrice}€ = ${cartData.selectedProductTotalPrice}€`;
}

function structureAndHydrateProductCart(storageKey) {
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
  selectedProductCartButtonDelete.id = "selected-product-cart-button-delete";

  //Incrémentation des données dans la structure HTML
  hydrateProductPage();

  //Création des noeuds pour structure html
  selectedProductCartContenair.appendChild(selectedProductCartBlock);
  selectedProductCartBlock.appendChild(selectedProductCartTr);
  selectedProductCartTr.appendChild(selectedProductCartName);
  selectedProductCartName.appendChild(selectedProductCartButtonDelete);
  selectedProductCartName.appendChild(selectedProductCartPicture);
  selectedProductCartTr.appendChild(selectedProductCartLensesSelected);
  selectedProductCartTr.appendChild(selectedProductCartRowPrice);
  selectedProductCartTr.appendChild(selectedProductCartButtonDeleteColumn);
  selectedProductCartButtonDeleteColumn.appendChild(selectedProductCartButtonDelete);

  deleteButton(selectedProductCartButtonDelete, storageKey);
}


//Calcul du prix des produits
function calculTotalPrice() {
  arrayPrice.push(cartData.selectedProductTotalPrice);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const cartTotalPrice = arrayPrice.reduce(reducer, 0);
  selectedProductCartFinalPrice.innerHTML = `${cartTotalPrice} €`;
}

function deleteButton(selectedProductCartButtonDelete, storageKey) {
  selectedProductCartButtonDelete.addEventListener('click', function () {
    deleteSelectedProductRow(selectedProductCartButtonDelete);
    deleteCart(storageKey);
  })
}

// Bouton supprimer article
function deleteSelectedProductRow(selectedProductCartButtonDelete) {
  let deleteSelectedProduct = selectedProductCartButtonDelete.parentNode.parentNode;
  deleteSelectedProduct.parentNode.removeChild(deleteSelectedProduct);
}

// suppression de l'article du storage
function deleteCart(i) {
  localStorage.removeItem(i);
  console.log(i);
  location.reload();
}


// // Requête POST pour envoyer l'objet Contact et le tableau products à l'API
async function postForm(orderData) {
  console.log(orderData);
  console.log(products);
  try {
    let response = await fetch("http://localhost:3000/api/cameras/order", {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: 'orderData',
    })
    console.log(response);

    if (response.ok) {

      let responseId = await response.json();
      let orderId = responseId.orderId;
      console.log(orderId);
      localStorage.setItem("orderIdConfirmation", orderId);
      window.location.href = "confirm.html";
    } else {
      console.error('Retour du serveur : ', response.status);

    }
  } catch (e) {
    console.log(e);
  }
}


function userAndProductData() {
  let firstname = document.getElementById('user-firstname').value;
  let lastname = document.getElementById('user-lastname').value;
  let address = document.getElementById('user-address').value;
  let city = document.getElementById('user-city').value;
  let email = document.getElementById('user-email').value;
  contact = new contactData(firstname, lastname, address, city, email);

  orderData = JSON.stringify({
    "contact": contact,
    "products": products,
  });
  postForm(orderData);

}



//Contrôle des données du formulaire
function controlForm() {
  let buttonOrder = document.getElementById('btn-order');
  buttonOrder.addEventListener('click', function () {
    let lastName = document.getElementById('user-lastname').value;
    let firstName = document.getElementById('user-firstname').value;
    let address = document.getElementById('user-address').value;
    let city = document.getElementById('user-city').value;
    let email = document.getElementById('user-email').value;

    if (lastName, firstName, address, city, email != "" && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      userAndProductData();
      event.preventDefault();
    } else {
      alert("Veuillez renseigner vos coordonnées.");
    }
  })
}

//Récupération des produits choisis
function productData(cartData) {
  products.push(cartData);
}

createProductsCart();
controlForm();
