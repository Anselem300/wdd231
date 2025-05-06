const date = new Date();
let currentYear = document.getElementById("currentYear");
currentYear.textContent = `${date.getFullYear()}`;

let lastModif = new Date(document.lastModified);
let lastModified = document.querySelector("#lastModified");
lastModified.textContent = `${lastModif.getMonth()+1}/${lastModif.getDate()}/${lastModif.getFullYear()}, ${lastModif.toLocaleTimeString()}`;



