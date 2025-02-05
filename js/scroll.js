let isAnimating = false; // Empêche le scroll multiple pendant l'animation

document.addEventListener("wheel", (event) => {
    if (isAnimating) return; // Bloque le scroll si une animation est en cours

    const sections = document.querySelectorAll(".full-screen");
    const h1Text = document.querySelectorAll(".page h1");
    const burgerButton = document.querySelector(".burger"); // Sélectionne le bouton burger
    let activeIndex = [...sections].findIndex(section => section.classList.contains("active"));

    let direction = event.deltaY > 0 ? "down" : "up"; // Détection de la direction

    let newIndex;
    if (direction === "down") {
        newIndex = Math.min(activeIndex + 1, sections.length - 1); // Aller à la section suivante sans boucle infinie
    } else {
        newIndex = Math.max(activeIndex - 1, 0); // Aller à la section précédente sans boucle infinie
    }

    if (newIndex === activeIndex) return; // Évite un changement inutile

    isAnimating = true; // Active la protection anti-scroll pendant l'animation

    // Supprime les classes d'animation des anciennes sections
    h1Text.forEach((text) => {
        text.classList.remove("slide-text-in-from-bottom", "slide-text-in-from-top", "slide-text-out-to-top", "slide-text-out-to-bottom");
    });

    // Désactive l'ancienne section
    sections[activeIndex].classList.remove("active");

    // Active la nouvelle section
    sections[newIndex].classList.add("active");

    // Vérifier si c'est la première section pour cacher ou afficher le bouton burger avec un fondu
    if (newIndex === 0) {
        burgerButton.classList.remove("fade-in");
        burgerButton.classList.add("fade-out");
        setTimeout(() => {
            burgerButton.style.display = "none"; // Cache après l'animation
        }, 500);
    } else {
        burgerButton.style.display = "block";
        setTimeout(() => {
            burgerButton.classList.remove("fade-out");
            burgerButton.classList.add("fade-in");
        }, 10);
    }

    // Animation du texte sortant
    if (direction === "down") {
        h1Text[activeIndex].classList.add("slide-text-out-to-top");
    } else {
        h1Text[activeIndex].classList.add("slide-text-out-to-bottom");
    }

    // Animation du texte entrant
    if (direction === "down") {
        h1Text[newIndex].classList.add("slide-text-in-from-bottom");
    } else {
        h1Text[newIndex].classList.add("slide-text-in-from-top");
    }

    // Réactive le scroll après l'animation
    setTimeout(() => {
        isAnimating = false;
    }, 1000); // Temps de l'animation
});

// Cacher le burger au chargement si on est sur la première section
window.addEventListener("load", () => {
    const burgerButton = document.querySelector(".burger");
    burgerButton.style.display = "none"; // Cache le burger au démarrage
});
