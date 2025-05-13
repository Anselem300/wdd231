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

const members = document.getElementById("member-container");
const gridbtn = document.getElementById("grid-view");
const listbtn = document.getElementById("list-view");

gridbtn.addEventListener("click", () => {
    members.classList.add("grid-view");
    members.classList.remove("list-view");
});

listbtn.addEventListener("click", () => {
    members.classList.add("list-view");
    members.classList.remove("grid-view");
});



async function getMembership() {
    try{
        const response = await fetch("../data/members.json");
        const companies = await response.json();

        members.innerHTML = "";

        companies.forEach(company => {
            const card = document.createElement("div");
            card.classList.add("member-card");

            card.innerHTML = `
            <img src="${company.image}" alt="${company.name} Logo">
            <h3>${company.name}</h3>
            <p><strong>Address:</strong> ${company.address}</p>
            <p><strong>Phone:</strong> ${company.phone_number}</p>
            <p><strong>Website:</strong> <a href="${company.url}" target="_blank">${company.url}</a></p>
            <p><strong>Membership:</strong> ${getMembershipLevel(company.membershipLevel)}</p>`;

            members.appendChild(card);
        });
    } catch (error) {
        console.error("Failed to load company data:", error);
        members.innerHTML = `<p>Could not load member data</p>`;
    }
}

function getMembershipLevel(level){
    switch(level){
        case 1: return "Member";
        case 2: return "Silver Member";
        case 3: return "Gold Member";
        default: return "unknown";
    }
}

getMembership();