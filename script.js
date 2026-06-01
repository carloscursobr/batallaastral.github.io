// ============================
// BATALLA ASTRAL ONLINE
// ============================

// Esperar a que cargue la página
document.addEventListener("DOMContentLoaded", () => {

    console.log("Batalla Astral iniciado");

    // Animación de entrada
    document.body.classList.add("loaded");

});

// ============================
// SONIDO DE BOTONES
// ============================

function playSound() {

    const click = document.getElementById("click");

    if (click) {

        click.currentTime = 0;
        click.play();

    }

}

// ============================
// MÚSICA DE FONDO
// ============================

const music =
document.getElementById("bgMusic");

const musicBtn =
document.getElementById("musicBtn");

if (musicBtn && music) {

    musicBtn.addEventListener("click", () => {

        if (music.paused) {

            music.play();

            musicBtn.innerHTML = "🔊 Música ON";

        } else {

            music.pause();

            musicBtn.innerHTML = "🔈 Música OFF";

        }

    });

}

// ============================
// BOTÓN ENTRAR
// ============================

function enterGame() {

    playSound();

    alert(
        "Bienvenido a Batalla Astral Online.\nPróximamente entrarás al mundo."
    );

}

// ============================
// TELEGRAM WEBAPP
// ============================

if (window.Telegram?.WebApp) {

    Telegram.WebApp.ready();

    Telegram.WebApp.expand();

    console.log("Telegram WebApp detectada");

}

// ============================
// EFECTO PARALLAX SUAVE
// ============================

document.addEventListener("mousemove", (e) => {

    const hero =
    document.querySelector(".hero img");

    if (!hero) return;

    const x =
    (window.innerWidth / 2 - e.clientX) / 100;

    const y =
    (window.innerHeight / 2 - e.clientY) / 100;

    hero.style.transform =
    `translate(${x}px, ${y}px)`;

});

// ============================
// TEMPORADA
// ============================

const seasonTitle =
document.getElementById("seasonTitle");

if (seasonTitle) {

    seasonTitle.innerText =
    "Temporada 1 - El Despertar de la Serpiente";

}
