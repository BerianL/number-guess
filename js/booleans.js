let minNumber = 1;
let maxNumber = 10;

document.addEventListener("DOMContentLoaded", init);

function init() {
  const input = document.querySelector(".input-bordered");
  const guessButton = document.querySelector(".guess");
  const settingsButton = document.querySelector(".settings");
  const resultParagraph = document.querySelector(".card-body p");

  input.setAttribute("placeholder", `Enter a number between ${minNumber} and ${maxNumber}.`);

  guessButton.addEventListener("click", handleGuess);
  settingsButton.addEventListener("click", showSettings);

  function handleGuess() {
    const userGuess = getUserGuess(input.value);

    if (isInvalidGuess(userGuess)) {
      displayResult(`Please enter a valid number between ${minNumber} and ${maxNumber}.`);
      return;
    }

    const randomNumber = getRandomNumber(minNumber, maxNumber);

    const guessMessage = getGuessMessage(userGuess, randomNumber);
    displayResult(guessMessage);

    updateGuessButtonText(guessButton);
  }

  function showSettings() {
    Swal.fire({
      title: 'Update Settings',
      html: `
      <div class="my-4">
      <label class="mr-4" for="minNumber">Min Number:</label>
        <input id="minNumber" type="number" value="${minNumber}" required class="input text-primary input-secondary input-xs w-full max-w-xs" />
        <br>
        <br>
        <label class="mr-4" for="maxNumber">Max Number:</label>
        <input id="maxNumber" type="number" value="${maxNumber}" required class="input text-primary input-secondary input-xs w-full max-w-xs">
        </div>
        `,
      showCancelButton: true,
      confirmButtonText: 'Update',
      preConfirm: () => {
        const newMin = parseInt(document.getElementById('minNumber').value);
        const newMax = parseInt(document.getElementById('maxNumber').value);

        if (!Number.isNaN(newMin) && !Number.isNaN(newMax) && newMin <= newMax) {
          minNumber = newMin;
          maxNumber = newMax;
          input.setAttribute("placeholder", `Enter a number between ${minNumber} and ${maxNumber}.`);
        } else {
          Swal.showValidationMessage('Invalid input. Please provide valid minimum and maximum numbers.');
        }
      },
    });

    // Clear input value and reset result paragraph
    input.value = '';
    resultParagraph.textContent = "Can you guess what number I am thinking?";
  }

  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getUserGuess(inputValue) {
    return parseInt(inputValue);
  }

  function isInvalidGuess(guess) {
    return Number.isNaN(guess) || guess < minNumber || guess > maxNumber;
  }

  function getGuessMessage(userGuess, randomNumber) {
    if (userGuess === randomNumber) {
      return `Mind Reader! You guessed the correct number! I was thinking of ${randomNumber}.`;
    } else if (Math.abs(userGuess - randomNumber) === 1) {
      return `So close! I was thinking of ${randomNumber}.`;
    } else {
      return `Sorry, I was thinking of ${randomNumber}.`;
    }
  }

  function updateGuessButtonText(button) {
    button.textContent = "Guess Again";
  }

  function displayResult(message) {
    resultParagraph.textContent = message;
  }
}
