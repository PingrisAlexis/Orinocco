//Strict mode statement
"use strict";

//Declaration of variables
let productsCardsContenair;
let newProductPageLink;
let newProductCard;
let newProductPicture;
let newProductInformations;
let newProductName;
let newProductDescription;

//Creation of the HTML structure of the home page
function structureProductCards() {

  //Creation of HTML elements
  productsCardsContenair = document.getElementById("products-cards-contenair");
  newProductPageLink = document.createElement("a");
  newProductCard = document.createElement("figure");
  newProductPicture = document.createElement("img");
  newProductInformations = document.createElement("figcaption");
  newProductName = document.createElement("h2");
  newProductDescription = document.createElement("p");

  //Création of HTML nodes
  productsCardsContenair.appendChild(newProductPageLink);
  newProductPageLink.appendChild(newProductCard);
  newProductCard.appendChild(newProductPicture);
  newProductCard.appendChild(newProductInformations);
  newProductInformations.appendChild(newProductName);
  newProductInformations.appendChild(newProductDescription);
}

//Hydration of the HTML structure
function hydrateProductCards(productData) {
  newProductPageLink.href = "html/product.html?id=" + productData._id;
  newProductPicture.src = productData.imageUrl;
  newProductName.innerHTML = productData.name;
  newProductDescription.innerHTML = productData.description;
}

//Calling functions according to iterative structure
function createProductCards(productData) {
  for (let i = 0; i < productData.length; i++) {
    structureProductCards();
    hydrateProductCards(productData[i]);
  }
}

// API request: Recovery of the data of the products to be displayed
async function getProducts() {
  try {
    let response = await fetch("http://localhost:3000/api/cameras");
    console.log(response);
    if (response.ok) {
      let productData = await response.json();
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

//Calling function
getProducts();