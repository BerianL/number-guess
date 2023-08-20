// Initial minimum and maximum number values
let minNumber = 1;
let maxNumber = 10;

// Wait for the DOM to be fully loaded before running the init function
document.addEventListener("DOMContentLoaded", init);

// Function to initialize the game
function init() {
  // Select necessary DOM elements
  const input = document.querySelector(".input-bordered");
  const guessButton = document.querySelector(".guess");
  const settingsButton = document.querySelector(".settings");
  const resultParagraph = document.querySelector(".card-body p");

  // Set the placeholder for the input field with the initial range
  input.setAttribute("placeholder", `Enter a number between ${minNumber} and ${maxNumber}.`);

  // Function to convert user input to a numeric value
  const getUserGuess = (inputValue) => {
    return parseInt(inputValue);
  }

  // Function to check if a guess is invalid
  const isInvalidGuess = (guess) => {
    return Number.isNaN(guess) || guess < minNumber || guess > maxNumber;
  }

  // Function to generate a random number within a range
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  // Function to generate the message based on the user's guess and the random number
  const getGuessMessage = (userGuess, randomNumber) => {
    if (userGuess === randomNumber) {
      return `Mind Reader! You guessed the correct number! I was thinking of ${randomNumber}.`;
    } else if (Math.abs(userGuess - randomNumber) === 1) {
      return `So close! I was thinking of ${randomNumber}.`;
    } else {
      return `Sorry, I was thinking of ${randomNumber}.`;
    }
  }

  // Function to display the result message
  const displayResult = (message) => {
    resultParagraph.textContent = message;
  }

  // Function to update the button text after a guess
  const updateGuessButtonText = (button) => {
    button.textContent = "Guess Again";
  }

  // Function to handle user's guess
  const handleGuess = () => {
    const userGuess = getUserGuess(input.value);

    // Check if the guess is invalid and display appropriate message
    if (isInvalidGuess(userGuess)) {
      displayResult(`Please enter a valid number between ${minNumber} and ${maxNumber}.`);
      return;
    }

    // Generate a random number and determine the result message
    const randomNumber = getRandomNumber(minNumber, maxNumber);
    const guessMessage = getGuessMessage(userGuess, randomNumber);

    // Display the result message and update button text
    displayResult(guessMessage);
    updateGuessButtonText(guessButton);
  }

  // Function to show the settings modal
  const showSettings = () => {
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
        // Update minNumber and maxNumber based on user input
        const newMin = parseInt(document.getElementById('minNumber').value);
        const newMax = parseInt(document.getElementById('maxNumber').value);

        // Validate the new values and update the input placeholder
        if (!Number.isNaN(newMin) && !Number.isNaN(newMax) && newMin <= newMax) {
          minNumber = newMin;
          maxNumber = newMax;
          input.setAttribute("placeholder", `Enter a number between ${minNumber} and ${maxNumber}.`);
        } else {
          // Show validation error if input is invalid
          Swal.showValidationMessage('Invalid input. Please provide valid minimum and maximum numbers.');
        }
      },
    });
  }

  // Add event listeners for guess and settings buttons
  guessButton.addEventListener("click", handleGuess);
  settingsButton.addEventListener("click", showSettings);

  // Clear input value and result message
  input.value = '';
  resultParagraph.textContent = "Can you guess what number I am thinking?";
}
