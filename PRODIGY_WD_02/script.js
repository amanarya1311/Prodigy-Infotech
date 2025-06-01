// Get references to DOM elements
const displayMinutes = document.getElementById('display-minutes');
const displaySeconds = document.getElementById('display-seconds');
const displayMilliseconds = document.getElementById('display-milliseconds');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');

// Initialize stopwatch variables
let startTime; // Stores the time when the stopwatch was started or resumed
let updatedTime; // Stores the current time during stopwatch operation
let difference; // Stores the difference between current time and start time
let tInterval; // Stores the interval ID for the stopwatch timer
let running = false; // Flag to check if the stopwatch is running
let lapCounter = 0; // Counter for lap numbers
let pausedTime = 0; // Stores the time elapsed when the stopwatch is paused

/**
 * Formats a number to always have two digits (e.g., 5 becomes "05").
 * @param {number} num - The number to format.
 * @returns {string} The formatted string.
 */
function formatTime(num) {
    return num < 10 ? '0' + num : num;
}

/**
 * Formats milliseconds to always have two digits (e.g., 5 becomes "05", 123 becomes "12").
 * @param {number} num - The milliseconds to format.
 * @returns {string} The formatted string.
 */
function formatMilliseconds(num) {
    return num < 10 ? '0' + num : (num < 100 ? String(num).substring(0, 2) : String(num).substring(0, 2));
}

/**
 * Updates the stopwatch display with the current time.
 */
function updateDisplay() {
    updatedTime = new Date().getTime(); // Get current time
    difference = updatedTime - startTime; // Calculate elapsed time

    // Calculate minutes, seconds, and milliseconds
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000));

    // Update the DOM elements with formatted time
    displayMinutes.textContent = formatTime(minutes);
    displaySeconds.textContent = formatTime(seconds);
    displayMilliseconds.textContent = formatMilliseconds(milliseconds);
}

/**
 * Starts or resumes the stopwatch.
 */
function startStopwatch() {
    if (!running) {
        // Set start time, accounting for any paused time
        startTime = new Date().getTime() - pausedTime;
        // Start the interval to update the display every 10 milliseconds
        tInterval = setInterval(updateDisplay, 10);
        running = true; // Set running flag to true
        // Disable start button, enable pause and lap buttons
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        lapBtn.disabled = false;
    }
}

/**
 * Pauses the stopwatch.
 */
function pauseStopwatch() {
    if (running) {
        clearInterval(tInterval); // Clear the interval
        pausedTime = difference; // Store the elapsed time
        running = false; // Set running flag to false
        // Enable start button, disable pause and lap buttons
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        lapBtn.disabled = true; // Disable lap when paused
    }
}

/**
 * Resets the stopwatch to zero and clears all lap times.
 */
function resetStopwatch() {
    clearInterval(tInterval); // Clear any running interval
    running = false; // Set running flag to false
    difference = 0; // Reset difference
    pausedTime = 0; // Reset paused time
    lapCounter = 0; // Reset lap counter

    // Reset display to "00:00:00"
    displayMinutes.textContent = '00';
    displaySeconds.textContent = '00';
    displayMilliseconds.textContent = '00';

    // Clear all lap times from the list
    lapList.innerHTML = '';

    // Enable start button, disable pause and lap buttons
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
}

/**
 * Records the current time as a lap and adds it to the lap list.
 */
function recordLap() {
    if (running) {
        lapCounter++; // Increment lap counter
        // Get the current formatted time from the display
        const lapTime = `${displayMinutes.textContent}:${displaySeconds.textContent}:${displayMilliseconds.textContent}`;

        // Create a new list item for the lap
        const listItem = document.createElement('li');
        listItem.classList.add('flex', 'justify-between', 'items-center', 'py-2', 'px-4', 'bg-gray-700', 'bg-opacity-30', 'rounded-lg', 'mb-2', 'shadow-md');
        listItem.innerHTML = `
            <span class="font-medium text-lg">Lap ${formatTime(lapCounter)}:</span>
            <span class="font-mono text-lg">${lapTime}</span>
        `;
        // Add the new lap item to the beginning of the list
        lapList.prepend(listItem);
    }
}

// Add event listeners to the buttons
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', recordLap);

// Initialize button states
pauseBtn.disabled = true;
lapBtn.disabled = true;