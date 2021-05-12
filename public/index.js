//Déclaration mode strict
"use strict";
//Déclaration des variables
let productsCardsContenair;
let newProductPageLink;
let newProductCard;
let newProductPicture;
let newProductInformations;
let newProductName;
let newProductDescription;

//Création de la structure HTML de la page d'accueil
function createStructureProductCards() {

  //Création des éléments HTML
  productsCardsContenair = document.getElementById("products-cards-contenair");
  newProductPageLink = document.createElement("a");
  newProductCard = document.createElement("figure");
  newProductPicture = document.createElement("img");
  newProductInformations = document.createElement("figcaption");
  newProductName = document.createElement("h2");
  newProductDescription = document.createElement("p");

  //Créations des noeuds HTML
  productsCardsContenair.appendChild(newProductPageLink);
  newProductPageLink.appendChild(newProductCard);
  newProductCard.appendChild(newProductPicture);
  newProductCard.appendChild(newProductInformations);
  newProductInformations.appendChild(newProductName);
  newProductInformations.appendChild(newProductDescription);
}

//Appel de la structure HTML + implantation des données selon la boucle 
function createProductCards(productData) {
  for (let i = 0; i < productData.length; i++) {
    createStructureProductCards();
    newProductPageLink.href = "html/product.html?id=" + productData[i]._id;
    newProductPicture.src = productData[i].imageUrl;
    newProductName.innerHTML = productData[i].name;
    newProductDescription.innerHTML = productData[i].description;
  }
}

// API request: Récupération des données des produits à afficher
async function getProducts() {
  try {
    let response = await fetch("http://localhost:3000/api/cameras");
    console.log(response);
    if (response.ok) {
      let productData = await response.json();
      console.log(productData);
      createProductCards(productData);
    }
    else {
      console.log(reponse.status)
    }
  }
  catch (err) {
    console.log('erreur : ' + err);
  }
}

//Appel fonction
getProducts();