import { date, currentYear } from "./menu.js";
import { lastModif, lastModified } from "./menu.js";

import { hamButton, navBar } from "./menu.js";

hamButton.addEventListener("click", () => {
    hamButton.classList.toggle("open");
    navBar.classList.toggle("open");
});


currentYear.textContent = `${date.getFullYear()}`;

lastModified.textContent = `${lastModif.toLocaleString()}`;

import { dataURl, indicators, startYear, table, body, loadingText } from "./menu.js";
const proxyUrl = 'https://corsproxy.io/?';

async function fetchMentalHealthData() {
    let allData = [];

    for (const code of indicators) {
        const url = `${proxyUrl}${dataURl}${code}?$filter=TimeDim ge ${startYear}`;

        try {
            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Uh oh! Failed to fetch information!")
            }

            const data = await response.json();
            allData.push(...data.value);
            console.log(allData)
        }
        catch (error) {
            console.error("Error fetching data for", code, error);
        }
    }

    // Sort and display the data
    allData.sort((a,b) => a.TimeDim - b.TimeDim);
    displayAllData(allData);
}

function displayAllData(data){
    const totalByYear = {};

    data.forEach(item => {
        const year = item.TimeDim;
        const value = parseFloat(item.Value);

        if(!isNaN(value)){
            if (!totalByYear[year]) {
                totalByYear[year] = 0;
            }
            totalByYear[year] += value;
        
        }

    });

    // Get the latest 5 years, sorted ascending but WHO only published for the past two years (2020 - 2021)
    const recentYears = Object.keys(totalByYear)
        .map(year => parseInt(year))
        .sort((a, b) => b - a)
        .slice(0, 5)
        .sort((a, b) => a - b);

    recentYears.forEach(year => {
        const row = document.createElement('tr');

        const yearCell = document.createElement("td");
        yearCell.textContent = year;

        const totalCell = document.createElement("td");
        totalCell.textContent = `${totalByYear[year].toFixed(2)}%`; // rounded to 2 decimals

        row.appendChild(yearCell);
        row.appendChild(totalCell);
        body.appendChild(row);
    });

    loadingText.style.display = "none";
    table.style.display = "table";
}

fetchMentalHealthData();

document.querySelectorAll(".open-modal").forEach(link => {
    link.addEventListener("click", show => {
        show.preventDefault();
        const modal = document.querySelector(link.getAttribute("href"));
        modal.hidden = false;
        modal.querySelector(".close-modal").focus();
    });
});

document.querySelectorAll(".close-modal").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest('.modal').hidden = true;
    });
});

document.getElementById("timestamp").value = new Date().toISOString();