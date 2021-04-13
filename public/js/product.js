"use strict"

function getProductsIdInUrl() {
  let urlSearch = new URLSearchParams(window.location.search);
  let idProduct = urlSearch.get('id');
  console.log(idProduct);
}

getProductsIdInUrl()

// PRODUCTS PAGES CREATION //

// function createProductsPages(productsData) {
//   // STRUCTURE HTML 
//   let productsPages = document.getElementById("products-pages");
//   let newProductImg = document.createElement("img");
//   let newProductFigcaption = document.createElement("figcaption");
//   let newProductName = document.createElement("h2");
//   let newProductDescription = document.createElement("p");
//   let newProductLenses = document.createElement("select");
//   let newProductPrice = document.createElement("span");
//   // ADD DATA
//   newProductImg.src = productsData[i].imageUrl;
//   newProductName.innerHTML = productsData[i].name;
//   newProductDescription.innerHTML = productsData[i].description;
//   newProductLenses.innerHTML = productsData[i].lenses;;
//   newProductPrice.innerHTML = productsData[i].price;
//   // NODES CREATION
//   productsPages.appendChild(newProductImg, newProductFigcaption);
//   newProductFigcaption.appendChild(newProductName);
//   newProductFigcaption.appendChild(newProductDescription);
//   newProductFigcaption.appendChild(newProductLenses);
//   newProductFigcaption.appendChild(newProductPrice);
// }

// API REQUEST //

async function getProducts() {
  try {
    let response = await fetch("http://localhost:3000/api/cameras");
    console.log(response);
    if (response.ok) {
      let productsData = await response.json();
      console.log(productsData);
    }
  }
  catch (err) {
    console.log('erreur : ' + err);
  }
}
getProducts()