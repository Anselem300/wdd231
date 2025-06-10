import { hamButton, navBar } from "./menu.js";

hamButton.addEventListener("click", () => {
    hamButton.classList.toggle("open");
    navBar.classList.toggle("open");
});

import { params } from "./menu.js";

import { date, currentYear } from "./menu.js";
import { lastModif, lastModified } from "./menu.js";

currentYear.textContent = `${date.getFullYear()}`;

lastModified.textContent = `${lastModif.toLocaleString()}`;

document.getElementById("first-name").textContent = params.get("first-name") || '';
document.getElementById("last-name").textContent = params.get("last-name") || '';
document.getElementById("email").textContent = params.get("email") || '';
document.getElementById("phone").textContent = params.get("phone") || '';
document.getElementById("type").textContent = params.get("type") || '';
document.getElementById("mental_state").textContent = params.get("mental_state") || '';

const isoTimeStamp = params.get("timestamp");
let formattedTime = "Not Available";
if (isoTimeStamp) {
    const date = new Date(isoTimeStamp);
    formattedTime = date.toLocaleString(undefined, {
        dateStyle: "long",
        timeStyle: "short"
    });
};

document.getElementById("timestamp").textContent = formattedTime