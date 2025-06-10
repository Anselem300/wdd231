import { date, currentYear } from "./menu.js";
import { lastModif, lastModified } from "./menu.js";

currentYear.textContent = `${date.getFullYear()}`;

lastModified.textContent = `${lastModif.toLocaleString()}`;

import { mentalSites } from "./menu.js";
import { resourcesContainer, gridBtn, listBtn } from "./menu.js";

import { hamButton, navBar } from "./menu.js";

hamButton.addEventListener("click", () => {
    hamButton.classList.toggle("open");
    navBar.classList.toggle("open");
});

async function  displaySites() {
    try{
        const response = await fetch(mentalSites);
        if(!response.ok) {
            throw new Error("Uh oh! Failed to load Mental Sites!");
        }

        const data = await response.json();
        resourcesContainer.innerHTML = "";

        data.forEach(item => {
            const card = document.createElement("div");
            card.classList.add("member-resource");

            card.innerHTML = `
            <img src="${item.image}" alt="${item.name} Logo" loading="lazy">
            <h4>${item.name}</h4>
            <address><strong>Address:</strong> ${item.address}</address>
            <a href="${item.website} rel="noopener">Visit Site</a>
            <p><strong>Impact:</strong> ${item.impact}</p>`;

            resourcesContainer.appendChild(card);
        });
    } catch (error){
        console.error("Failed to load Mental Sites Info", error)
    }
}

gridBtn.addEventListener("click", () => {
    resourcesContainer.classList.add("grid-view");
    resourcesContainer.classList.remove("list-view");
});

listBtn.addEventListener("click", ()=> {
    resourcesContainer.classList.add("list-view");
    resourcesContainer.classList.remove("grid-view");
})

displaySites();