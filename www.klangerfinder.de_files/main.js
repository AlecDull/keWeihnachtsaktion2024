var turnSpeed = 2;
var timer;

var turnMain;
var currentMainTurn = 0;

var mainAudio;
var backgroundAudio;








function closePopover() {
    document.getElementById("popover").style.display = "none";
    const content = document.getElementById("content");
    content.classList.add("show");
}






var audioInstances = {};
var fadeIntervals = {};

function startAudio(name) {
    if (!audioInstances[name]) {
        audioInstances[name] = new Audio("./www.klangerfinder.de_files/" + name + ".mp3");
        audioInstances[name].loop = true;
        audioInstances[name].volume = 0.0; // Startet bei null für den Fade-In-Effekt
    }

    clearInterval(fadeIntervals[name]); // Vorherige Fade-Out-Intervalle stoppen
    audioInstances[name].play();

    // Fade-In-Effekt
    fadeIntervals[name] = setInterval(() => {
        if (audioInstances[name].volume < 1.0) {
            audioInstances[name].volume = Math.min(audioInstances[name].volume + 0.02, 1.0);
        } else {
            clearInterval(fadeIntervals[name]);
        }
    }, 20); // Erhöht die Lautstärke alle 20 ms
}

function stopAudio(name) {
    if (audioInstances[name]) {
        clearInterval(fadeIntervals[name]); // Vorherige Fade-In-Intervalle stoppen

        // Fade-Out-Effekt
        fadeIntervals[name] = setInterval(() => {
            if (audioInstances[name].volume > 0.02) { // Stoppt knapp über 0
                audioInstances[name].volume = Math.max(audioInstances[name].volume - 0.02, 0.0); // Verringert um 0.02
            } else {
                clearInterval(fadeIntervals[name]);
                audioInstances[name].volume = 0; // Stellt sicher, dass die Lautstärke auf 0 ist
                audioInstances[name].pause();
                audioInstances[name].currentTime = 0; // Zurücksetzen auf den Anfang
            }
        }, 20); // Verringert die Lautstärke alle 20 ms
    }
}


function playAudioRiser(audioFilePath) {
    const riser = new Audio('./www.klangerfinder.de_files/riser.wav');
    riser.play();
    riser.volume = 0.5;
}




const teamMembers = {
    eins: { name: "John Vogelmann", role: "Projektleitung und Komposition", image: "./www.klangerfinder.de_files/backgroundvideo.mp4" },
    zwei: { name: "Prof. Florian Käppler", role: "Geschäftsführer", image: "./www.klangerfinder.de_files/florian.jpg" },
    drei: { name: "Ari García", role: "Audiovisual Mediadesigner", image: "./www.klangerfinder.de_files/ari.jpg" },
    vier: { name: "Christina Zenk", role: "Research and Design Evaluation", image: "./www.klangerfinder.de_files/christina.jpg" },
    fünf: { name: "Lukas Münter", role: "Audio Engineering", image: "./www.klangerfinder.de_files/lukas.jpg" },
    sechs: { name: "Vincent Neyses", role: "Auszubildender", image: "./www.klangerfinder.de_files/viney.jpg" },
    sieben: { name: "Josef Häusel", role: "Creative Technologist, AI-Development", image: "./www.klangerfinder.de_files/josef.jpg" },
    acht: { name: "Jonathan Schulze", role: "Auszubildender", image: "./www.klangerfinder.de_files/jonathan.jpg" },
    neun: { name: "Fabio Espejo", role: "Auszubildender", image: "./www.klangerfinder.de_files/fabio.jpg" },
    zehn: { name: "Alec Dull", role: "Intern", image: "./www.klangerfinder.de_files/alec.jpg" },
    elf: { name: "Paul Göritz", role: "Projektleitung und Sound Design", image: "./www.klangerfinder.de_files/paul.jpg" },
    zwölf: { name: "Denis Weitmann", role: "Innovation and AI Strategist", image: "./www.klangerfinder.de_files/denis.jpg" },
    dreizehn: { name: "Ute Schieß", role: "Backoffice", image: "./www.klangerfinder.de_files/ute.jpg" },
    vierzehn: { name: "Leo Frick", role: "Lead Composer", image: "./www.klangerfinder.de_files/leo.jpg" },
    fünfzehn: { name: "Ari García", role: "Audiovisual Mediadesigner", image: "./www.klangerfinder.de_files/ari.jpg" },
    sechtzehn: { name: "Christina Zenk", role: "Research and Design Evaluation", image: "./www.klangerfinder.de_files/christina.jpg" },
    siebzehn: { name: "Lukas Münter", role: "Audio Engineering", image: "./www.klangerfinder.de_files/lukas.jpg" },
    achtzehn: { name: "Vincent Neyses", role: "Auszubildender", image: "./www.klangerfinder.de_files/viney.jpg" },
    neunzehn: { name: "Josef Häusel", role: "Creative Technologist, AI-Development", image: "./www.klangerfinder.de_files/josef.jpg" },
    zwanzig: { name: "Jonathan Schulze", role: "Auszubildender", image: "./www.klangerfinder.de_files/jonathan.jpg" },
    einundzwanzig: { name: "Fabio Espejo", role: "Auszubildender", image: "./www.klangerfinder.de_files/fabio.jpg" },
    zweiundzwanzig: { name: "Alec Dull", role: "Intern", image: "./www.klangerfinder.de_files/alec.jpg" },
    dreiundzwanzig: { name: "Paul Göritz", role: "Projektleitung und Sound Design", image: "./www.klangerfinder.de_files/paul.jpg" },
    vierundzwanzig: { name: "Denis Weitmann", role: "Innovation and AI Strategist", image: "./www.klangerfinder.de_files/denis.jpg" },
};

function showPopup(id) {
    const member = teamMembers[id];
    if (member) {
        document.getElementById("popupName").innerText = member.name;
        document.getElementById("popupRole").innerText = member.role;
        document.getElementById("popupImage").src = member.image;
        document.getElementById("teamPopup").style.display = "block";
    }
}

function hidePopup() {
    document.getElementById("teamPopup").style.display = "none";
}



function randomizePositions(buttons) {
    buttons.forEach(button => {
        // Initiale Positionen festlegen, falls noch nicht vorhanden
        if (!button.dataset.initialTop) {
            const computedStyle = getComputedStyle(button);
            button.dataset.initialTop = parseFloat(computedStyle.top); // Startposition oben
            button.dataset.initialLeft = parseFloat(computedStyle.left); // Startposition links
        }

        // Bewegung innerhalb eines kleinen Radius um die Initialposition
        const initialTop = parseFloat(button.dataset.initialTop);
        const initialLeft = parseFloat(button.dataset.initialLeft);

        const randomOffsetTop = (Math.random() - 0.5) * 20; // ±10% Bewegung
        const randomOffsetLeft = (Math.random() - 0.5) * 20; // ±10% Bewegung

        const newTop = Math.max(0, Math.min(100, initialTop + randomOffsetTop));
        const newLeft = Math.max(0, Math.min(100, initialLeft + randomOffsetLeft));

        button.style.top = `${newTop}%`;
        button.style.left = `${newLeft}%`;
    });
}

function animateButtons(buttons) {
    setInterval(() => {
        buttons.forEach(button => {
            const currentTop = parseFloat(button.style.top) || 50; // Aktuelle Position, Standard 50%
            const currentLeft = parseFloat(button.style.left) || 50; // Aktuelle Position, Standard 50%

            // Zufällige Offsets für Bewegung in alle Richtungen
            const randomOffsetTop = (Math.random() - 0.5) * 10; // ±5%
            const randomOffsetLeft = (Math.random() - 0.5) * 10; // ±5%

            // Neue Position berechnen
            const newTop = Math.max(0, Math.min(100, currentTop + randomOffsetTop));
            const newLeft = Math.max(0, Math.min(100, currentLeft + randomOffsetLeft));

            button.style.transition = 'top 2s ease-in-out, left 2s ease-in-out';
            button.style.top = `${newTop}%`;
            button.style.left = `${newLeft}%`;
        });
    }, 3000); // Bewegung alle 3 Sekunden
}

// Initialisierung
document.addEventListener('DOMContentLoaded', () => {
    const buttons = Array.from(document.querySelectorAll('.face-button'));

    buttons.forEach((button, index) => {
        button.textContent = index + 1; // Jede Zahl sichtbar auf den Button setzen
    });

    randomizePositions(buttons); // Zufällige Positionen zuweisen
    animateButtons(buttons); // Bewegung starten
});