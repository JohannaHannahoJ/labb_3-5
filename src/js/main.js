
/**
 * Hambugermeny, knapp
 */
const hamburger = document.getElementById("hamburger");

/**
 * Navigationsmeny
 */
const nav = document.querySelector("nav");

if (hamburger && nav) {
  /**
   * Lyssnar efter klick på hamburgermeny-knapp
   * 
   */
  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
    hamburger.classList.toggle("active");
    const expanded = hamburger.classList.contains("active");
    hamburger.setAttribute("aria-expanded", expanded);
  });
}

/**
 * Spelknapp
 */
const spelKnapp = document.querySelector(".spel-knapp");

/**
 * Meddelandefält
 */
const resultat = document.querySelector(".resultat");

if (spelKnapp && resultat) {
  /**
   * Lyssna efter klick och lämna meddelande 
   */
  spelKnapp.addEventListener("click", () => {
    resultat.textContent = "Du klarade det. Bra gjort!";
  });
}