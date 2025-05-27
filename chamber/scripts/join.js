// Set current timestamp
document.getElementById("timestamp").value = new Date().toISOString();

// Modal Open

document.querySelectorAll(".open-modal").forEach(link => {
    link.addEventListener("click", show => {
        show.preventDefault();
        const modal = document.querySelector(link.getAttribute("href"));
        modal.hidden = false;
        modal.querySelector(".close-modal").focus();
    });
});

// Close Modal

document.querySelectorAll(".close-modal").forEach(btn => {
    btn.addEventListener("click", () => {
        btn.closest('.modal').hidden = true;
    });
});


// For the Open Modal section
// modal.hidden = false;
// document.body.style.overflow = 'hidden'; // disable background scroll

// For the Close Modal section 
// btn.closest('.modal').hidden = true;
// document.body.style.overflow = ''; // re-enable scroll

const now = new Date();
document.getElementById("timestamp").value = now.toISOString(); 
// sets current time when document loads