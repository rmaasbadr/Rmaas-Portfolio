/* =========================
   ELEMENTS
========================= */

const languageBtn = document.getElementById("languageBtn");
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");


/* =========================
   CURRENT YEAR
========================= */

year.textContent = new Date().getFullYear();


/* =========================
   LANGUAGE SWITCHER
========================= */

let currentLanguage =
    localStorage.getItem("portfolioLanguage") || "en";


function setLanguage(language) {

    currentLanguage = language;

    // Change page language
    document.documentElement.lang = language;

    // Change page direction
    document.documentElement.dir =
        language === "ar" ? "rtl" : "ltr";

    document.body.setAttribute(
        "dir",
        language === "ar" ? "rtl" : "ltr"
    );

    // Translate all text
    const elements =
        document.querySelectorAll("[data-en][data-ar]");

    elements.forEach(element => {

        const translation = element.getAttribute(
            language === "ar" ? "data-ar" : "data-en"
        );

        element.textContent = translation;

    });

    // Update language button
    languageBtn.textContent =
        language === "en" ? "AR" : "EN";

    // Save language
    localStorage.setItem(
        "portfolioLanguage",
        language
    );

}


/* =========================
   LANGUAGE BUTTON
========================= */

languageBtn.addEventListener("click", () => {

    if (currentLanguage === "en") {
        setLanguage("ar");
    } else {
        setLanguage("en");
    }

});


/* =========================
   DARK / LIGHT MODE
========================= */

let currentTheme =
    localStorage.getItem("portfolioTheme") || "light";


function setTheme(theme) {

    currentTheme = theme;

    if (theme === "dark") {

        document.body.classList.add("dark-mode");

        themeBtn.textContent = "☀";

    } else {

        document.body.classList.remove("dark-mode");

        themeBtn.textContent = "☾";

    }

    localStorage.setItem(
        "portfolioTheme",
        theme
    );

}


/* =========================
   THEME BUTTON
========================= */

themeBtn.addEventListener("click", () => {

    if (currentTheme === "light") {
        setTheme("dark");
    } else {
        setTheme("light");
    }

});


/* =========================
   MOBILE MENU
========================= */

menuBtn.addEventListener("click", () => {

    navLinks.classList.toggle("open");

    const isOpen =
        navLinks.classList.contains("open");

    menuBtn.textContent =
        isOpen ? "✕" : "☰";

    menuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

});


/* =========================
   CLOSE MENU ON CLICK
========================= */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("open");

        menuBtn.textContent = "☰";

        menuBtn.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


/* =========================
   SCROLL ANIMATIONS
========================= */

const revealElements =
    document.querySelectorAll(".reveal");


if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        (entries) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("active");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.1
        }
    );

    revealElements.forEach(element => {

        observer.observe(element);

    });

} else {

    revealElements.forEach(element => {

        element.classList.add("active");

    });

}


/* =========================
   INITIAL SETTINGS
========================= */

setLanguage(currentLanguage);

setTheme(currentTheme);

menuBtn.setAttribute(
    "aria-expanded",
    "false"
);