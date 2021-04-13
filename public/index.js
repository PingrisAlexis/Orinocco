"use strict";
// let url = "https://ab-p5-api.herokuapp.com/api/cameras?fbclid=IwAR2EC7RnIF-UwO5vP09FtcDKNvagdHVRBGp53bX6bEkZ_CVhn6v37oJ1CFs";

// PRODUCTS CARDS CREATION //

function createProductCards(productsData) {
  for (let i = 0; i < productsData.length; i++) {
    // STRUCTURE HTML 
    let productsCards = document.getElementById("products-cards");
    let linkProduct = document.createElement("a");
    let newProductImg = document.createElement("img");
    let newProductFigcaption = document.createElement("figcaption");
    let newProductName = document.createElement("h2");
    let newProductDescription = document.createElement("p");
    // ADD DATA
    linkProduct.href = "html/product.html?id=" + productsData[i]._id;
    newProductImg.src = productsData[i].imageUrl;
    newProductName.innerHTML = productsData[i].name;
    newProductDescription.innerHTML = productsData[i].description;
    // NODES CREATION
    productsCards.appendChild(linkProduct);
    linkProduct.appendChild(newProductImg);
    linkProduct.appendChild(newProductFigcaption);
    newProductFigcaption.appendChild(newProductName);
    newProductFigcaption.appendChild(newProductDescription);
  }
}

// API REQUEST //

async function getProducts() {
  try {
    let response = await fetch("http://localhost:3000/api/cameras");
    console.log(response);
    if (response.ok) {
      let productsData = await response.json();
      console.log(productsData);
      createProductCards(productsData)
    }
    else {
      console.log(reponse.status)
    }
  }
  catch (err) {
    console.log('erreur : ' + err);
  }
}
getProducts()