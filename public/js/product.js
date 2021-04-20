"use strict";

// ID PRODUCT //

function getProductsIdInUrl() {
  let urlSearch = new URLSearchParams(window.location.search);

  return urlSearch.get("id");
}

let idProduct = getProductsIdInUrl();
console.log(idProduct);

// PRODUCTS PAGES CREATION //

function createProductsPages(productData) {
  for (let i = 0; i < productData.length; i++) {
    if (productData[i]._id === idProduct) {
      // Initialisation HTML structure
      let productPageContenair = document.getElementById("product-page-contenair");
      let newProductCard = document.createElement("figure");
      let newProductPicture = document.createElement("img");
      let newProductInformations = document.createElement("figcaption");
      let newProductName = document.createElement("h2");
      let newProductDescription = document.createElement("p");
      let newProductPrice = document.createElement("span");
      let newProductLensesLabel = document.createElement("label");
      let newProductLensesSelect = document.createElement("select");
      // Create Product Card Contenair
      productPageContenair.appendChild(newProductCard);
      // Create Product Card
      newProductCard.appendChild(newProductPicture);
      newProductCard.appendChild(newProductInformations);
      // Create Products Informations
      newProductInformations.appendChild(newProductName);
      newProductInformations.appendChild(newProductDescription);
      newProductInformations.appendChild(newProductLensesLabel);
      newProductInformations.appendChild(newProductPrice);
      // Get Product Picture
      newProductPicture.src = productData[i].imageUrl;
      // Get Product Description
      newProductDescription.innerHTML = productData[i].description;
      // Get Product Name
      newProductName.innerHTML = productData[i].name;
      // Get Product Price
      newProductPrice.innerHTML = productData[i].price + " €";
      // Create and Get Product Lenses
      newProductLensesLabel.appendChild(newProductLensesSelect);
      for (let k = 0; k < productData[i].lenses.length; k++) {
        let newProductLenses = document.createElement("option");
        newProductLenses.innerHTML = productData[i].lenses[k];
        newProductLensesSelect.appendChild(newProductLenses);
      }






      // Submit selected product to local storage 
      let buttonAddToCart = document.getElementById('btn-add-to-cart');

      buttonAddToCart.addEventListener('click', function (event) {
        // event.preventDefault();

        let selectedProduct = {
          selectedProductName: productData[i].name,
          selectedProductPicture: productData[i].imageUrl,
          selectedProductLenses: productData[i].lenses,
          selectedProductPrice: productData[i].price + " €",
        }

        let selectedProductCart = JSON.parse(localStorage.getItem('selectedProductCart') || '[]');

        selectedProductCart.push(selectedProduct);

        localStorage.setItem('selectedProductCart', JSON.stringify(selectedProductCart));
        console.log(localStorage);
      })
    }
  }
}

// REQUEST API //

async function getProducts() {
  try {
    let response = await fetch("http://localhost:3000/api/cameras");
    console.log(response);
    if (response.ok) {
      let productsData = await response.json();
      console.log(productsData);

      createProductsPages(productsData)
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