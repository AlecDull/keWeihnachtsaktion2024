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
    John: { name: "John Vogelmann", role: "Projektleitung und Komposition", image: "./www.klangerfinder.de_files/john.jpg" },
    Florian: { name: "Prof. Florian Käppler", role: "Geschäftsführer", image: "./www.klangerfinder.de_files/florian.jpg" },
    Ari: { name: "Ari García", role: "Audiovisual Mediadesigner", image: "./www.klangerfinder.de_files/ari.jpg" },
    Christina: { name: "Christina Zenk", role: "Research and Design Evaluation", image: "./www.klangerfinder.de_files/christina.jpg" },
    Lukas: { name: "Lukas Münter", role: "Audio Engineering", image: "./www.klangerfinder.de_files/lukas.jpg" },
    Viney: { name: "Vincent Neyses", role: "Auszubildender", image: "./www.klangerfinder.de_files/viney.jpg" },
    Josef: { name: "Josef Häusel", role: "Creative Technologist, AI-Development", image: "./www.klangerfinder.de_files/josef.jpg" },
    Jonathan: { name: "Jonathan Schulze", role: "Auszubildender", image: "./www.klangerfinder.de_files/jonathan.jpg" },
    Fabio: { name: "Fabio Espejo", role: "Auszubildender", image: "./www.klangerfinder.de_files/fabio.jpg" },
    Alec: { name: "Alec Dull", role: "Intern", image: "./www.klangerfinder.de_files/alec.jpg" },
    Paul: { name: "Paul Göritz", role: "Projektleitung und Sound Design", image: "./www.klangerfinder.de_files/paul.jpg" },
    Denis: { name: "Denis Weitmann", role: "Innovation and AI Strategist", image: "./www.klangerfinder.de_files/denis.jpg" },
    Ute: { name: "Ute Schieß", role: "Backoffice", image: "./www.klangerfinder.de_files/ute.jpg" },
    Leo: { name: "Leo Frick", role: "Lead Composer", image: "./www.klangerfinder.de_files/leo.jpg" }
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