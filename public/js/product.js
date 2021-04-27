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
      let newProductLensesSelect = document.createElement("select");
      // let newProductQuantity = document.createElement("select");
      let newProductPrice = document.createElement("span");

      // Create Product Card
      productPageContenair.appendChild(newProductCard);
      newProductCard.appendChild(newProductPicture);
      newProductCard.appendChild(newProductInformations);
      newProductInformations.appendChild(newProductName);
      newProductInformations.appendChild(newProductDescription);
      // Get Product Picture
      newProductPicture.src = productData[i].imageUrl;
      // Get Product Description
      newProductDescription.innerHTML = productData[i].description;
      newProductName.innerHTML = productData[i].name;
      newProductPrice.innerHTML = `${productData[i].price / 100} €`,
        // Create and Get Product Lenses
        newProductInformations.appendChild(newProductLensesSelect);
      for (let k = 0; k < productData[i].lenses.length; k++) {
        let newProductLenses = document.createElement("option");
        newProductLenses.innerHTML = productData[i].lenses[k];
        newProductLensesSelect.appendChild(newProductLenses);
      }

      newProductInformations.appendChild(newProductPrice);

      let selectedLenses = document.querySelector('select');
      selectedLenses.addEventListener('change', function () {
        let index = selectedLenses.value;
        console.log(index);
      })

      // Submit selected product to local storage 
      let buttonAddToCart = document.getElementById('btn-add-to-cart');

      buttonAddToCart.addEventListener('click', function () {
        let selectedProduct = {
          selectedProductId: productData[i]._id,
          selectedProductName: productData[i].name,
          selectedProductPicture: productData[i].imageUrl,
          selectedProductLenses: selectedLenses.value,
          selectedProductPrice: `${productData[i].price / 100} €`,
        }
        localStorage.setItem(i, JSON.stringify(selectedProduct));
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