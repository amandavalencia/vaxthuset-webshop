import { plantList } from "./plantListArray";

export function createHtmlForLandingpage() {
    const productpageDiv = document.getElementById("showPlant") as HTMLDivElement;
  
    for (let i = 0; i < plantList.length; i++) {
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
      productpageDiv?.appendChild(plantItemDiv);
            // When clicking on the products in landing page this will open up
            plantItemDiv.addEventListener("click", () =>{
              window.sessionStorage.setItem("selectedPlant", JSON.stringify(plant));
              window.location.replace("/productPage.html");
            })
            // Append the wrapper div to the main container
           
          }
        }
      
  