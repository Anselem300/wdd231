const hamButton = document.querySelector("#menu");
const navigation = document.querySelector("#navigation");

hamButton.addEventListener("click", () => {
    navigation.classList.toggle("open");

    if (navigation.classList.contains("open")) {
        hamButton.textContent = "X";
    } else {
        hamButton.textContent = "☰";
    }
});