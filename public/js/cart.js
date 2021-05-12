//Déclaration mode strict
"use strict";

//Déclaration des variables
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

//Création d'une classe pour la structure de l'objet contact
class contactData {
  constructor(name, surname, address, city, email) {
    this.firstName = name;
    this.lastName = surname;
    this.address = address;
    this.city = city;
    this.email = email;
  }
}

//Récuperation des données du storage + implantation des données recues dans la structure HTML
function createProductsCart() {
  //Si panier vide, on redirige sur la page d'accueil
  if (localStorage.length === 0) {
    alert("Votre panier est actuellement vide, vous allez être redirigé vers la page d'accueil!");
    window.location.href = "../index.html";
  }
  //Si le panier contient minimum un produit, on boucle sur le nombre de produits afin des récuperer les données recquises
  else {
    for (let i = 0; i < localStorage.length; i++) {
      // Récupération des données stockées des produits ajoutés au panier
      let storageKey = localStorage.key(i);
      let storageJson = localStorage.getItem(storageKey);
      cartData = JSON.parse(storageJson);
      //Activation de la création de la structure HTML
      structureAndHydrateProductCart(storageKey, cartData);
      calculTotalPrice();
    }
  }
}

//Implantation des données dans la structure HTML
function hydrateCartPage() {
  selectedProductCartName.innerHTML = cartData.selectedProductName;
  selectedProductCartPicture.src = cartData.selectedProductPicture;
  selectedProductCartLensesSelected.innerHTML = cartData.selectedProductLenses;
  selectedProductCartRowPrice.innerHTML = `${cartData.selectedProductQuantity} x ${cartData.selectedProductUnityPrice}€ = ${cartData.selectedProductTotalPrice}€`;
}

//Création de la structure HTML
function structureAndHydrateProductCart(storageKey) {
  //Création des éléments HTML de la page panier
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

  //Inmplantation des données dans la structure HTML
  hydrateCartPage();

  //Création des noeuds pour structure HTML
  selectedProductCartContenair.appendChild(selectedProductCartBlock);
  selectedProductCartBlock.appendChild(selectedProductCartTr);
  selectedProductCartTr.appendChild(selectedProductCartName);
  selectedProductCartName.appendChild(selectedProductCartButtonDelete);
  selectedProductCartName.appendChild(selectedProductCartPicture);
  selectedProductCartTr.appendChild(selectedProductCartLensesSelected);
  selectedProductCartTr.appendChild(selectedProductCartRowPrice);
  selectedProductCartTr.appendChild(selectedProductCartButtonDeleteColumn);
  selectedProductCartButtonDeleteColumn.appendChild(selectedProductCartButtonDelete);

  //Création d'un boutton effacer article pour chaques lignes présentes dans le panier
  deleteButton(selectedProductCartButtonDelete, storageKey);
}

//Calcul du prix des produits dans le  tableau arrayPrice, puis affichage du résultat dans la struture HTML
function calculTotalPrice() {
  arrayPrice.push(cartData.selectedProductTotalPrice);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  cartTotalAmount = arrayPrice.reduce(reducer, 0);

  selectedProductCartTotalAmount.innerHTML = `${cartTotalAmount} €`;
}

//Ecoute de la demande de suppression des articles, suppression de la ligne panier et du storage via la clé du produit
function deleteButton(selectedProductCartButtonDelete, storageKey) {
  selectedProductCartButtonDelete.addEventListener('click', function () {
    deleteSelectedProductRow(selectedProductCartButtonDelete);
    deleteCart(storageKey);
  })
}

//Suppression de l'article de la structure HTML
function deleteSelectedProductRow(selectedProductCartButtonDelete) {
  let deleteSelectedProduct = selectedProductCartButtonDelete.parentNode.parentNode;
  deleteSelectedProduct.parentNode.removeChild(deleteSelectedProduct);
}

//Suppression de l'article du localstorage
function deleteCart(i) {
  localStorage.removeItem(i);
  console.log(i);
  location.reload();
}

//Contrôle des données du formulaire
function controlForm() {
  let buttonOrder = document.getElementById('btn-order');
  //Ecoute du click sur le boutton "commander"
  buttonOrder.addEventListener('click', function () {
    lastNameValue = lastName.value;
    firstNameValue = firstName.value;
    addressValue = address.value;
    cityValue = city.value;
    emailValue = email.value;
    //si le formulaire est valide, on pousse le montant de total du panier dans le local storage, et on active la fonction userAndProductData() (ligne 155)
    if (lastNameValue, firstNameValue, addressValue, cityValue, emailValue != "" && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailValue)) {
      userAndProductData();
      localStorage.setItem("orderAmount", cartTotalAmount);
      //Si le formulaire n'est pas valide, on demande à l'utilisateur de corriger la saisie
    } else {
      alert("Veuillez renseigner vos coordonnées.");
    }
  })
}

//Récupération des données clients et produits,
function userAndProductData() {
  //Récupération et remplissage de l'objet contactData. 
  contact = new contactData(firstNameValue, lastNameValue, addressValue, cityValue, emailValue);
  //Convertion des données contact et products en JSON -> OrderData. Puis activation fonction postForm(OrderData).
  orderData = JSON.stringify({ contact, products });
  postForm(orderData);
}

//Requete POST
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

//Appel des fonctions
createProductsCart();
controlForm();
