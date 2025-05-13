const hamButton = document.getElementById('hamburger');
const navigation = document.getElementById('navigation');

hamButton.addEventListener("click", () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});


const date = new Date();
let currentYear = document.getElementById("currentYear");
currentYear.textContent = `${date.getFullYear()}`;

const lastModif = new Date(document.lastModified);
let lastModified = document.getElementById("lastModified");
lastModified.textContent = `${lastModif.toLocaleDateString()}, ${lastModif.toLocaleTimeString()}`;