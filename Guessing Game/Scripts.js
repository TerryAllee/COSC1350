// Student Name: Terry Allee
// File Name: scripts.js
// Date November 4, 2024

// Guess a number between 1 and 100
let randomNumber = Math.floor(Math.random() * 100) + 1
let guesses = [];
let maxTurns = 10;

document.getElementById('submitGuess').addEventListener('click', () => {
    const guessInput = document.getElementById('guess');
    const guess = parseInt(guessInput.value);

    if(isNaN(guess) || guess < 1|| guess > 100){
        document.getElementById('result').textContent = 'Enter a number between 1 and 100.';
        return;
    }

    guesses.push(guess);
    document.getElementById('previousGuesses').textContent = 'Previous guesses: ' + guesses.join(',');

    if (guess === randomNumber) {
        document.getElementById('result').textContent = 'Congratulations! You guessed the correct number!';
        endGame();
    } else if (guesses.length >= maxTurns) {
        document.getElementById('result').textContent = `Game Over! The random number was ${randomNumber}.`;
        endGame();
    } else {
        document.getElementById('result').textContent = guess< randomNumber
            ? 'You are guessing too low.'
            : 'You are guessing too high.';
    }
    
    guessInput.value = '';
    guessInput.focus();
});

function endGame() {
    document.getElementById('guess').disabled = true;
    document.getElementById('submitGuess').disabled = true;
    if (!document.querySelector('main button')) {
        const resetButton = document.createElement('button');
        resetButton.textContent = 'Start New Game';
        resetButton.onclick = resetGame;
        document.querySelector('main').appendChild(resetButton);
    }
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) +1;
    guesses = [];
    document.getElementById('result').textContent = '';
    document.getElementById('previousGuesses').textContent = '';
    document.getElementById('guess').disabled = false;
    document.getElementById('submitGuess').disabled = false;
    document.getElementById('guess').value = '';
    document.getElementById('guess').focus();
    document.querySelector('main').removeChild(document.querySelector('main').lastChild);
}