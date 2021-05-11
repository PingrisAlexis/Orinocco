"use strict";
// let url = "https://ab-p5-api.herokuapp.com/api/cameras?fbclid=IwAR2EC7RnIF-UwO5vP09FtcDKNvagdHVRBGp53bX6bEkZ_CVhn6v37oJ1CFs";

// PRODUCTS CARDS CREATION //

function createProductCards(productData) {
  for (let i = 0; i < productData.length; i++) {
    // Initialisation HTML structure
    let productsCardsContenair = document.getElementById("products-cards-contenair");
    let newProductPageLink = document.createElement("a");
    let newProductCard = document.createElement("figure");
    let newProductPicture = document.createElement("img");
    let newProductInformations = document.createElement("figcaption");
    let newProductName = document.createElement("h2");
    let newProductDescription = document.createElement("p");
    // Create Products Cards Link
    productsCardsContenair.appendChild(newProductPageLink);
    // Create Products Cards
    newProductPageLink.appendChild(newProductCard);

    newProductCard.appendChild(newProductPicture);
    newProductCard.appendChild(newProductInformations);
    newProductInformations.appendChild(newProductName);
    newProductInformations.appendChild(newProductDescription);

    newProductPageLink.href = "html/product.html?id=" + productData[i]._id;
    newProductPicture.src = productData[i].imageUrl;
    newProductName.innerHTML = productData[i].name;
    newProductDescription.innerHTML = productData[i].description;
  }
}

// API REQUEST //

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
getProducts();
console.log(localStorage);