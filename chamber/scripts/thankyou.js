const params = new URLSearchParams(window.location.search);

document.getElementById("first-name").textContent = params.get("first-name") || '';
document.getElementById("last-name").textContent = params.get("last-name") || '';
document.getElementById("email").textContent = params.get("email") || '';
document.getElementById("phone").textContent = params.get("phone") || '';
document.getElementById("position").textContent = params.get("org-title") || '';
document.getElementById("organization").textContent = params.get("organization") || '';
document.getElementById("org_description").textContent = params.get("org_description") || '';

const isoTimeStamp = params.get("timestamp");
let formattedTime = "Not Available";
if (isoTimeStamp) {
    const date = new Date(isoTimeStamp);
    formattedTime = date.toLocaleString(undefined, {
        dateStyle: "long",
        timeStyle: "short"
    });
};

document.getElementById("timestamp").textContent = formattedTime;