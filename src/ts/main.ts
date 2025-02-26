import "./../scss/style.scss";
import "./../scss/product.scss";
import "./../scss/vaxter.scss";
import "./../scss/cart.scss";
import "./../scss/hamburger.scss";
import "./../scss/skotselrad.scss";

import { plantList } from "./plantListArray";
import { skotselList } from "./skotselradArray.ts";
import { Plant } from "./products";


document.addEventListener("DOMContentLoaded", () => {
    const contactButton = document.getElementById(
        "contactButton"
        ) as HTMLButtonElement;
        
        contactButton.addEventListener("click", function () {
            window.location.href = "kontaktaOss.html";
        });
    });
    
//Hamburger Menu
const menuToggle = document.getElementById("menuToggle") as HTMLElement;
const navigationMenu = document.querySelector(
  ".navigation-menu"
) as HTMLElement;
const closeButton = document.querySelector(
  ".close-button"
) as HTMLButtonElement;
menuToggle.addEventListener("click", () => {
  setTimeout(() => {
    navigationMenu.classList.toggle("show");
  }, 100);
});

closeButton.addEventListener("click", () => {
  navigationMenu.classList.remove("show");
});

//Add To Cart Icon when clicked
const cartButton = document.getElementById("cartBtn");
const cartContainer = document.getElementById("cart") as HTMLElement;
cartButton?.addEventListener("click", () => {
  cartContainer.classList.toggle("show");
});

document.getElementById("btnClose")?.addEventListener("click", () => {
  cartContainer.classList.remove("show");
});

// For Loop (Rendering OOP Products) for Landing page
function createHtmlForLandingpage() {
  const productpageDiv = document.getElementById("showPlant") as HTMLDivElement;

  for (let i = 0; i < 4; i++) {
    const plant = plantList[i];

    const plantItemDiv = document.createElement("div");
    plantItemDiv.classList.add("plant");

    const imageElement = document.createElement("img");
    imageElement.src = plant.image;
    imageElement.alt = plant.plantName;

    const nameElement = document.createElement("h1");
    nameElement.innerHTML = plant.plantName;

    const priceElement = document.createElement("p");
    priceElement.innerHTML = `${plant.price} kr`;

    plantItemDiv.appendChild(imageElement);
    plantItemDiv.appendChild(nameElement);
    plantItemDiv.appendChild(priceElement);

    // When clicking on the products in the landing page, open the product page
    plantItemDiv.addEventListener("click", () => {
      window.sessionStorage.setItem("selectedPlant", JSON.stringify(plant));
      window.location.replace("/productPage.html");
    });

    if (productpageDiv) {

      productpageDiv.appendChild(plantItemDiv);
    }
  }
}
createHtmlForLandingpage();

// Function for Växter.html page
function createHtmlForVaxterPage() {
  const vaxterPageDiv = document.getElementById("productParent") as HTMLDivElement;

  // Create a parent container for all plant containers
  const plantContainerParent = document.createElement("div");
  plantContainerParent.classList.add("plantContainerParent");

  for (let i = 0; i < plantList.length; i++) {
    const plant = plantList[i];

    const plantItemDiv = document.createElement("div");
    plantItemDiv.classList.add("plantContainer");

    const directionContainer = document.createElement("div");
    directionContainer.classList.add("directionContainer");

    const itemContainer = document.createElement("div");
    itemContainer.classList.add("itemContainer");

    const imageElement = document.createElement("img");
    imageElement.src = plant.image;
    imageElement.alt = plant.plantName;

    const nameElement = document.createElement("h1");
    nameElement.innerHTML = plant.plantName;

    const priceElement = document.createElement("p");
    priceElement.innerHTML = `${plant.price} kr`;

    itemContainer.appendChild(imageElement);
    itemContainer.appendChild(nameElement);
    itemContainer.appendChild(priceElement);

    directionContainer.appendChild(itemContainer);

    plantItemDiv.appendChild(directionContainer);

    plantItemDiv.addEventListener("click", () => {
      window.location.replace(`/productPage.html?plantIndex=${i}`);
      window.sessionStorage.setItem("selectedPlant", JSON.stringify(plant));
    });

    plantContainerParent.appendChild(plantItemDiv);
  }

  // Clear existing content in vaxterPageDiv before appending
  vaxterPageDiv.innerHTML = "";
  
  vaxterPageDiv.appendChild(plantContainerParent);
}
document.addEventListener("DOMContentLoaded", () => {
  createHtmlForVaxterPage();
});


//Rendering the class Skötselråd items in html
function createHtmlForSkotselrad() {
  const skotselradDiv = document.getElementById(
    "skotselCardContainers"
  ) as HTMLDivElement;

  for (let i = 0; i < skotselList.length; i++) {
    const skotsel = skotselList[i];

    const skotselDiv = document.createElement("div");
    skotselDiv.classList.add("skotselcardDiv");

    const skotselImg = document.createElement("img");
    skotselImg.src = skotsel.image;
    skotselImg.classList.add("skotselcardImg");

    const skotselHead = document.createElement("h2");
    skotselHead.innerHTML = skotsel.header;

    const descriptionElement = document.createElement("p");
    descriptionElement.innerHTML = skotsel.description;

    skotselDiv.appendChild(skotselImg);
    skotselDiv.appendChild(skotselHead);
    skotselDiv.appendChild(descriptionElement);

    skotselradDiv?.appendChild(skotselDiv);
  }
}
createHtmlForSkotselrad();

// Function for searchbar
searchbarFunctionality();
function searchbarFunctionality() {
  document.addEventListener("DOMContentLoaded", () => {
    // Function to make suggestions clickable
    function createSuggestionItem(plant: Plant): HTMLLIElement {
      const listItem = document.createElement("li");
      listItem.classList.add("suggestion-item");

      const contentContainer = document.createElement("div");
      contentContainer.classList.add("suggestion-content-container");

      const imgItem = document.createElement("img");
      imgItem.src = plant.image;
      imgItem.alt = plant.plantName;
      imgItem.classList.add("suggestion-image");

      const plantName = document.createElement("span");
      plantName.textContent = plant.plantName;
      plantName.classList.add("suggestion-text");

      listItem.appendChild(contentContainer);
      contentContainer.appendChild(plantName);
      contentContainer.appendChild(imgItem);

      listItem.addEventListener("click", () => {
        if (plant.plantId !== undefined) {

          // Navigate to productPage.html if plantId is available
          window.location.replace(`/productPage.html?plantId=${plant.plantId}`);
        } else {

          // Fallback to default behavior for other pages
          window.location.replace(
            `/productPage.html?plantIndex=${plantList.indexOf(plant)}`
          );
        }
        window.sessionStorage.setItem("selectedPlant", JSON.stringify(plant));
      });
      return listItem;
    }

    function renderPlants(plants?: Plant[]) {
      const plantListElement = document.getElementById("plantList");

      if (plantListElement) {
        plantListElement.innerHTML = "";

        if (plants) {
          plants.forEach((plant) => {
            const listItem = createSuggestionItem(plant);
            plantListElement.appendChild(listItem);
            plantListElement.appendChild(listItem);
          });
        }
      }
    }

    // Search logic
    function handleSearch() {
      const searchInput = document.querySelector(
        ".inputSearchbar"
      ) as HTMLInputElement;
      const searchSuggestions = document.getElementById(
        "plantList"
      ) as HTMLUListElement;

      if (searchInput && searchSuggestions) {
        const searchTerm = searchInput.value.toLowerCase();

        if (searchTerm.trim() === "") {
          searchSuggestions.style.display = "none";
          return;
        }

        const filteredPlants = plantList.filter((plant) =>
          plant.plantName.toLowerCase().includes(searchTerm)
        );

        renderPlants(filteredPlants);

        if (filteredPlants.length > 0) {
          searchSuggestions.style.display = "block";
        } else {
          searchSuggestions.style.display = "none";
        }
      }
    }

    document.addEventListener("click", (event) => {
      const searchInput = document.querySelector(
        ".inputSearchbar"
      ) as HTMLInputElement;
      const searchSuggestions = document.getElementById(
        "plantList"
      ) as HTMLUListElement;

      if (searchInput && searchSuggestions) {
        if (
          !searchInput.contains(event.target as Node) &&
          !searchSuggestions.contains(event.target as Node)
        ) {
          searchSuggestions.style.display = "none";
        }
      }
    });

    document.querySelector(".inputSearchbar")?.addEventListener("focus", () => {
      const searchSuggestions = document.getElementById(
        "plantList"
      ) as HTMLUListElement;
      if (searchSuggestions) {
        searchSuggestions.style.display = "none";
      }
    });

    document
      .querySelector(".inputSearchbar")
      ?.addEventListener("input", handleSearch);

    renderPlants(plantList);
  });
}


// Extracting ID's from html 
const addButton = document.getElementById("increment") as HTMLButtonElement;
const removeButton = document.getElementById("decrement") as HTMLButtonElement;
const valueOfPlant = document.getElementById("valueOfPlant") as HTMLDivElement;
const addToCartButton = document.getElementById("addToCart") as HTMLButtonElement;
const productPlantImg = document.getElementById("productPlantImg") as HTMLImageElement;
let plantNumber = 1;

// Increase or decrease quantity in product page "add to cart button"
if (valueOfPlant) {
addButton.addEventListener("click", () => {
  plantNumber += 1;
  valueOfPlant.innerHTML = plantNumber.toString();
});

removeButton.addEventListener("click", () => {
  if (plantNumber > 1) {
    plantNumber -= 1;
    valueOfPlant.innerHTML = plantNumber.toString();
  } else {
    return false;
  }
});
} else {
  console.log("Error: valueOfPlant element not found.");
}

// Show information in the product page
let selectedPlant = JSON.parse(
  sessionStorage.getItem("selectedPlant") ?? "{}"
);

if (selectedPlant) {
  clickedPlantInformation(selectedPlant);
} else {
  console.log("selectedPlant is null or not found in sessionStorage");
}

function clickedPlantInformation(selectedPlant: Plant) {
  if (!selectedPlant) {
    console.error("selectedPlant is null or undefined");
    return;
  }

  const plantName = document.getElementById("plantName") as HTMLHeadElement;
  const plantDescription = document.getElementById("plantDescription") as HTMLParagraphElement;
  const plantCareSunlight = document.getElementById("plantCareSunlight") as HTMLParagraphElement;
  const plantSpecifications = document.getElementById("plantSpecifications") as HTMLDivElement;
  const plantCareSpecifications = document.getElementById("plantCareSpecifications") as HTMLDivElement;
  const priceOfPlant = document.getElementById("priceOfPlant") as HTMLParagraphElement;
  const nameInLatin = document.getElementById("nameInLatin") as HTMLParagraphElement;

  if (!plantName || !plantDescription || !plantCareSunlight || !plantSpecifications || !plantCareSpecifications || !priceOfPlant || !nameInLatin) {
    console.error("One or more elements not found in the DOM");
    return;
  }

  plantName.innerHTML = selectedPlant.plantName;
  productPlantImg.src = selectedPlant.image;
  plantDescription.innerHTML = selectedPlant.productInfo;
  plantCareSunlight.innerHTML = selectedPlant.needOfSunlight;
  plantCareSpecifications.innerHTML = selectedPlant.plantCareSpecifications;
  plantSpecifications.innerHTML = selectedPlant.plantSpecifications;
  priceOfPlant.innerHTML = selectedPlant.price + "kr inkl. moms";
  nameInLatin.innerHTML = selectedPlant.nameInLatin;
}

let cartArray: Plant[] = JSON.parse(
  localStorage.getItem("storedProducts") ?? "[]"
);

document.addEventListener("DOMContentLoaded", function () {
addToCartButton.addEventListener("click", () => {
  if (selectedPlant) {
    const existingPlant = cartArray.find(
      (plant) => plant.plantId === selectedPlant!.plantId
    );

    if (existingPlant) {
      existingPlant.quantity = plantNumber;
    } else {
      selectedPlant.quantity = plantNumber;
      cartArray.push(selectedPlant);
    }
    updateShoppingCart();
    htmlForCartArray();

  }
});
});

// Create HTML for cart
export function htmlForCartArray() {
  const cartItems = document.getElementById("cartItems") as HTMLDivElement;
  const totalAmountElement = document.getElementById(
    "totalAmount"
  ) as HTMLDivElement;

  cartItems.innerHTML = "";
  let totalAmount = 0;

  for (let i = 0; i < cartArray.length; i++) {
    const productContent = document.createElement("div");
    const itemContent = document.createElement("div");
    const imageNameContainer = document.createElement("div");
    const quantityPriceContainer = document.createElement("div");
    const quantityButtonsContainer = document.createElement("div");
    const itemImage = document.createElement("img");
    const itemName = document.createElement("p");
    const itemQuantity = document.createElement("span");
    const itemPrice = document.createElement("div");
    const incrementButton = document.createElement("button");
    const decrementButton = document.createElement("button");

    productContent.setAttribute("id", "productContent");

    itemContent.classList.add("itemContent");
    itemContent.setAttribute("id", "itemContent");
    itemName.setAttribute("id", "itemName");
    itemName.classList.add("itemName");
    itemQuantity.setAttribute("id", "itemQuantity");
    itemQuantity.classList.add("itemQuantity");
    itemPrice.setAttribute("id", "itemPrice");
    itemPrice.classList.add("itemPrice");

    imageNameContainer.classList.add("imageNameContainer");
    quantityPriceContainer.classList.add("quantityPriceContainer");
    quantityButtonsContainer.classList.add("quantityButtonsContainer");
    incrementButton.classList.add("incrementButton");
    decrementButton.classList.add("decrementButton");

    itemImage.src = cartArray[i].image;
    itemImage.alt = cartArray[i].plantName;
    itemImage.classList.add("cart-plant-image");

    itemName.innerText = cartArray[i].plantName;
    const quantity = cartArray[i].quantity || 1;
    itemQuantity.innerText = `Antal: ${quantity}`;
    const price = cartArray[i].price * quantity;
    itemPrice.innerText = `${price} kr`;

    totalAmount += price;

    incrementButton.innerText = "+";
    decrementButton.innerText = "-";

    incrementButton.addEventListener("click", () => {
      cartArray[i].quantity = (cartArray[i].quantity || 1) + 1;

      updateShoppingCart();
      htmlForCartArray();
    });

    decrementButton.addEventListener("click", () => {
        if (cartArray[i].quantity && cartArray[i].quantity > 1) {
          cartArray[i].quantity -= 1;
        } else {

          cartArray.splice(i, 1);
        }
      
        updateShoppingCart();
        htmlForCartArray();
      });
    
    imageNameContainer.appendChild(itemImage);
    imageNameContainer.appendChild(itemName);

    quantityButtonsContainer.appendChild(incrementButton);
    quantityButtonsContainer.appendChild(decrementButton);

    quantityPriceContainer.appendChild(itemQuantity);
    quantityPriceContainer.appendChild(itemPrice);
  
    itemContent.appendChild(imageNameContainer);
    itemContent.appendChild(quantityPriceContainer);
    itemContent.appendChild(quantityButtonsContainer);
    productContent.appendChild(itemContent);

    cartItems?.appendChild(productContent);
  }

  totalAmountElement.innerText = `Summa: ${totalAmount} kr`;
}

function updateShoppingCart() {
  localStorage.setItem("storedProducts", JSON.stringify(cartArray));
}

// Initial call to update the cart when the page loads
updateShoppingCart();
htmlForCartArray();


//Button to checkout page
const checkoutButtons = document.getElementsByClassName("checkoutBtn");

for (const button of checkoutButtons) {
  button.addEventListener("click", function () {
    window.location.href = "checkoutPage.html";
  });
}
