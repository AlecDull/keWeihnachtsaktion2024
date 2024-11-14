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