const apiKey = "ac093f68f38db43b9b99b887d309e48b";
const lat = 4.81;
const lon = 7.04;
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

const currentTemp = document.getElementById("current-temp");
const weatherIcon = document.getElementById("weather-icon");
const captionDesc = document.querySelector("figcaption");

async function getCurrentWeather(){
    try {
        const response = await fetch(url);
        if (response.ok){
             const data = await response.json();
            //  console.log(data);
             displayResults(data);
        } else {
        throw  error(await response.text());
        }
    }
    catch (error) {
        console.error("Error loading data:", error);
    }
}

function displayResults(data) {
    currentTemp.innerHTML = `<strong>${data.main.temp}&deg;C</strong>`;
    const iconsrc = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    let description = data.weather[0].description;
    weatherIcon.setAttribute("src", iconsrc);
    weatherIcon.setAttribute("alt", description);

    captionDesc.textContent = description;
}

getCurrentWeather();

// 3 day forecast
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
async function ThreeDayForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error(await response.text());
        const data = await response.json();
        const forecast = data.list;

        const dailyForecast = [];
        const usedDates = new Set();

        for (let item of forecast) {
            const date = item.dt_txt.split(" ")[0];

            const time = item.dt_txt.split(" ")[1];

            if(!usedDates.has(date) && time === "12:00:00") {
                usedDates.add(date);

                dailyForecast.push(item);
            }

            if(dailyForecast.length === 3) break;
        }

        let html = "";

        dailyForecast.forEach(f => {
            const date = new Date(f.dt_txt).toDateString();
            const temp = f.main.temp;

            const description = f.weather[0].description;
            const iconsrc = f.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/w/${iconsrc}.png`;

            html += `
            <div class="details">
              <h4>${date}</h4>
              <img src="${iconUrl}" alt="${description}">
              <p>Temp: ${temp}&deg;C</p>
              <p>${description}</>
            </div>`;
        });

        document.getElementById("forecast").innerHTML = html;
    }
    catch (error) {
       console.error("Error loading data:", error);
    }
}

ThreeDayForecast();


// Display spotlight members
const memberUrl = "./data/members.json";

async function displaySpotlightMembers(){
    try {
        const response = await fetch(memberUrl);
        if (!response.ok) {
            throw new Error("Failed to load member data");
        }

        const members = await response.json();

        const spotlightCandidates = members.filter(m => 
            m.membershipLevel === 2 || m.membershipLevel === 3
        );

        // shuffle the array
        const shuffled = spotlightCandidates.sort(() => 0.5 - Math.random());

        // Randomly pick 2 or 3 spolight number
        const selected = shuffled.slice(0, Math.floor(Math.random() * 2) + 2);

        // Get container element in html
        const container = document.getElementById("spotlights");
        container.innerHTML = "";

        // Loop through selected members and create cards
        selected.forEach(member => {
            const card = document.createElement("div");
            card.classList.add("spotlight-card");

            card.innerHTML = `
            <img src="${member.image}" alt="${member.name} Logo">
            <h4>${member.name}</h4>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone_number}</p>
            <p><strong>Webtsite:</strong> <a href="${member.url}" target="_blank">Visit Site</a></p>
            <p><strong>Level:</strong> ${member.membershipLevel === 2 ?  "Silver" : "Gold"}</p>
            `;

            container.appendChild(card);
        })
    }
    catch (error) {
        console.error("Error loading spotlight members:", error);
    }
}

displaySpotlightMembers();