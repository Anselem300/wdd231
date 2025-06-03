const interest = document.getElementById("interest");
const url = "./data/areas.json";

async function getInterest() {
    try {
        const response = await fetch(url);
        const data = await response.json();

        data.forEach((item) => {
            const card = document.createElement("div");
            card.className = 'deck';

            card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
            <img src="${item.image}" alt="${item.name} Image" width="300" height="200" loading="lazy">
            </figure>
            <p>${item.description}</p>
            <address>${item.address}</address>
            <button>Learn More</button>`;

            interest.appendChild(card);
        });
    } catch (error) {
        console.log("Failed to load area of interest", error);
        interest.innerHTML = `Failed to load area of interest!`;
    }
}

getInterest();

const overlay = document.getElementById("overlay");
const displayMessage = document.getElementById("visit-message");
const closeButton = document.getElementById("close-overlay");

const lastVisitKey = "lastVisitTime";
const now = Date.now();
const oneDay = 24 * 60 * 60 * 1000;

const lastVisit = localStorage.getItem(lastVisitKey);

let message = "";

if(!lastVisit) {
    // first visit
    message = "Welcome! Let us know if you have any questions.";
} else {
    const timeDiff = now - parseInt(lastVisit, 10);

    if(timeDiff < oneDay) {
        message = "Back so soon! Awesome!"
    } else {
        const daysAgo = Math.floor(timeDiff/oneDay);
        message = `You last visited ${daysAgo} day${daysAgo === 1 ? "" : "s"} ago`;
    }
}

displayMessage.textContent = message;
overlay.style.display = "block";

localStorage.setItem(lastVisitKey, now.toString());

closeButton.addEventListener("click", () => {
    overlay.style.display = "none";
  });