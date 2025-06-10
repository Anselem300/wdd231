import { hamButton, navBar, visitMessage, closeButton, displayContainer } from "./menu.js";
import { siteContainer } from "./menu.js";

hamButton.addEventListener("click", () => {
    navBar.classList.toggle("open");
    hamButton.classList.toggle("open");
})

const lastVisitKey = "lastVisitTime";
const now = Date.now();
const oneDay = 24 * 60 * 60 * 1000;

const lastvisit = localStorage.getItem(lastVisitKey);

let message = "";

if(!lastvisit) {
    message = "Welcome to Mental Health Lab!";
} else {
    const timeDiff = now - parseInt(lastvisit, 10);

    if(timeDiff < oneDay) {
        message = "Back so soon! Awesome!"
    } else {
        const daysAgo = Math.floor(timeDiff/oneDay);
        message = `You last visited ${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
    }
}

visitMessage.textContent = message;
displayContainer.style.display = "grid";

localStorage.setItem(lastVisitKey, now.toString());

closeButton.addEventListener("click", () => {
    displayContainer.style.display = "none";
})

const mentalSites = "./data/mental_sites.json";

async function getMentalSites() {
    try {
        const response = await fetch(mentalSites);
        if (!response.ok) {
            throw new Error("Uh oh! Failed to load Mental Sites!");
        }
        const data = await response.json();
        const businesses = data.filter(business => business.image && business.website);

        // const shuffled = businesses.sort(() => Math.random() - 0.5) for random selection
        
        // Limit to first 3 results
        const topThree = businesses.slice(0, 3)
        siteContainer.innerHTML = "";

        topThree.forEach(site => {
            const card = document.createElement("div");
            card.classList.add("resource-card"); // class for styling
            card.innerHTML = `
                <img src="${site.image}" alt="${site.name} logo" loading="lazy"/>
                <h4>${site.name}</h4>
                <a href="${site.website}" target="_blank" rel="noopener">Visit Site</a>
                <address><strong>Address:</strong> ${site.address}</address>
                <p><strong>Impact:</strong> ${site.impact}</p>
            `;

            siteContainer.appendChild(card);
        })
    } catch (error) {
        console.error(error.message);
    }
}

getMentalSites();

import { date, currentYear } from "./menu.js";

currentYear.textContent = `${date.getFullYear()}`;

import { lastModif, lastModified } from "./menu.js";
lastModified.textContent = `${lastModif.toLocaleString()}`