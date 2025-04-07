// main.js

// Get references to the DOM elements
const textArea = document.getElementById('text');
const speedInput = document.getElementById('speed');
const playButton = document.getElementById('play-button');
const pauseButton = document.getElementById('pause-button');
const stopButton = document.getElementById('stop-button');
const voiceSelect = document.getElementById('voice');

let speech = new SpeechSynthesisUtterance();
let isSpeaking = false;
let voices = [];

// Function to populate the available voices
function populateVoices() {
    voices = window.speechSynthesis.getVoices();
    voiceSelect.innerHTML = ''; // Clear existing options
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.value = voice.name;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

// Function to set the language and speak the text
function speak() {
    if (textArea.value.trim() === '') return; // Do not speak if the text area is empty

    speech.text = textArea.value;
    speech.rate = speedInput.value;
    speech.voice = voices.find(voice => voice.name === voiceSelect.value) || voices[0]; // Default to first voice if not found
    speech.lang = speech.voice.lang; // Set the language based on the selected voice

    window.speechSynthesis.speak(speech);
    isSpeaking = true;
}

// Event listeners
playButton.addEventListener('click', speak);
pauseButton.addEventListener('click', () => {
    if (isSpeaking) {
        window.speechSynthesis.pause();
    }
});
stopButton.addEventListener('click', () => {
    window.speechSynthesis.cancel();
    isSpeaking = false;
});

// Populate voices on load
window.speechSynthesis.onvoiceschanged = populateVoices;

// Set the default voice and language
function setDefaultVoice() {
    if (voices.length > 0) {
        voiceSelect.value = voices[0].name; // Set the default voice
    }
}

// Call the function to set the default voice
setDefaultVoice();