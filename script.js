// Game variables
let min = 1;
let max = 100;
let secretNumber = generateRandomNumber(min, max);
let attempts = 0;
let previousGuesses = [];
let minRange = min;
let maxRange = max;

// DOM elements
const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const message = document.getElementById('message');
const minNum = document.getElementById('min-num');
const maxNum = document.getElementById('max-num');
const attemptsSpan = document.getElementById('attempts');
const previousGuessesSpan = document.getElementById('previous-guesses');
const resetBtn = document.getElementById('reset-btn');
const difficultySelect = document.getElementById('difficulty-select');
const progressBar = document.getElementById('progress-bar');
const rangeMin = document.getElementById('range-min');
const rangeMax = document.getElementById('range-max');

// Init game
function initGame() {
    // Set display values
    minNum.textContent = min;
    maxNum.textContent = max;
    rangeMin.textContent = min;
    rangeMax.textContent = max;
    
    // Focus on input
    guessInput.focus();
    
    // Update UI
    updateRangeIndicator();
}

// Generate random number
function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set message
function setMessage(text, className) {
    message.textContent = text;
    message.className = className;
}

// Update range indicator
function updateRangeIndicator() {
    const totalRange = max - min;
    const currentRange = maxRange - minRange;
    
    // Calculate width and position of progress bar
    const leftPos = ((minRange - min) / totalRange) * 100;
    const width = (currentRange / totalRange) * 100;
    
    progressBar.style.marginLeft = `${leftPos}%`;
    progressBar.style.width = `${width}%`;
}

// Handle guess submission
function handleGuess() {
    const guess = parseInt(guessInput.value);
    
    // Validate input
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please enter a number between ${min} and ${max}`, 'error');
        guessInput.value = '';
        return;
    }
    
    // Increment attempts
    attempts++;
    attemptsSpan.textContent = attempts;
    
    // Add to previous guesses
    previousGuesses.push(guess);
    previousGuessesSpan.textContent = previousGuesses.join(', ');
    
    // Check guess
    if (guess === secretNumber) {
        // Game won
        setMessage(`Congratulations! ${secretNumber} is correct! You got it in ${attempts} attempts.`, 'correct');
        guessInput.disabled = true;
        guessBtn.disabled = true;
        guessInput.style.borderColor = '#28a745';
        
        // Show confetti animation
        showConfetti();
    } else {
        // Determine if too high or too low
        if (guess > secretNumber) {
            setMessage(`${guess} is too high! Try again.`, 'hint');
            maxRange = Math.min(maxRange, guess - 1);
        } else {
            setMessage(`${guess} is too low! Try again.`, 'hint');
            minRange = Math.max(minRange, guess + 1);
        }
        
        // Update range indicator
        updateRangeIndicator();
        
        // Clear input
        guessInput.value = '';
        guessInput.focus();
    }
}

// Reset game
function resetGame() {
    // Reset game variables
    minRange = min;
    maxRange = max;
    secretNumber = generateRandomNumber(min, max);
    attempts = 0;
    previousGuesses = [];
    
    // Reset UI
    guessInput.disabled = false;
    guessBtn.disabled = false;
    guessInput.value = '';
    guessInput.style.borderColor = '#ddd';
    attemptsSpan.textContent = '0';
    previousGuessesSpan.textContent = '';
    setMessage('', '');
    
    // Update range indicator
    updateRangeIndicator();
    
    // Focus on input
    guessInput.focus();
}

// Change difficulty
function changeDifficulty() {
    const difficulty = difficultySelect.value;
    
    switch (difficulty) {
        case 'easy':
            min = 1;
            max = 50;
            break;
        case 'medium':
            min = 1;
            max = 100;
            break;
        case 'hard':
            min = 1;
            max = 200;
            break;
        case 'expert':
            min = 1;
            max = 500;
            break;
    }
    
    // Update UI
    minNum.textContent = min;
    maxNum.textContent = max;
    rangeMin.textContent = min;
    rangeMax.textContent = max;
    
    // Reset game
    resetGame();
}

// Add confetti animation when win
function showConfetti() {
    // Simple confetti effect using just DOM elements
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'confetti-container';
    confettiContainer.style.position = 'absolute';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.overflow = 'hidden';
    confettiContainer.style.pointerEvents = 'none';
    document.body.appendChild(confettiContainer);
    
    const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', '#8BC34A', '#FFEB3B', '#FFC107', '#FF9800', '#FF5722'];
    
    for (let i = 0; i < 150; i++) {
        const confetti = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.position = 'absolute';
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 5 + 5}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.top = '-10px';
        confetti.style.opacity = Math.random() + 0.5;
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        confettiContainer.appendChild(confetti);
        
        // Animate falling
        const duration = Math.random() * 3 + 2;
        const delay = Math.random() * 2;
        
        confetti.style.animation = `fall ${duration}s ease-in ${delay}s forwards`;
        
        // Create keyframe animation
        const style = document.createElement('style');
        style.innerHTML = `
            @keyframes fall {
                0% { transform: translateY(0) rotate(${Math.random() * 360}deg); }
                100% { transform: translateY(${window.innerHeight}px) rotate(${Math.random() * 720}deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.remove();
    }, 6000);
}

// Event listeners
guessBtn.addEventListener('click', handleGuess);
guessInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        handleGuess();
    }
});
resetBtn.addEventListener('click', resetGame);
difficultySelect.addEventListener('change', changeDifficulty);

// Initialize game on load
document.addEventListener('DOMContentLoaded', initGame);