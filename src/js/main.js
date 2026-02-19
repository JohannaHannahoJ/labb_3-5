const hamburger = document.getElementById("hamburger");
const nav = document.querySelector("nav");

hamburger.addEventListener("click", () => {
  nav.classList.toggle("active");
  hamburger.classList.toggle("active");
  const expanded = hamburger.classList.contains("active");
  hamburger.setAttribute("aria-expanded", expanded);
});

const spelKnapp = document.querySelector(".spel-knapp");
const resultat = document.querySelector(".resultat");

spelKnapp.addEventListener("click", () => {
  resultat.textContent = "Du klarade det. Bra gjort!";
});