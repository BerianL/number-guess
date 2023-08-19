document.addEventListener("DOMContentLoaded", function () {
  const input = document.querySelector(".input-bordered");
  const guessButton = document.querySelector(".btn");
  const resultParagraph = document.querySelector(".card-body p");

  guessButton.addEventListener("click", function () {
    const userGuess = parseInt(input.value);
    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
      resultParagraph.textContent = "Please enter a valid number between 1 and 10.";
      return;
    }

    const randomNumber = Math.floor(Math.random() * 10) + 1;

    if (userGuess === randomNumber) {
      resultParagraph.textContent = `Mind Reader! <br>You guessed the correct number!<br> I was thinking of ${randomNumber}.`;
    } else if (Math.abs(userGuess - randomNumber) === 1) {
      resultParagraph.textContent = `So close! I was thinking of ${randomNumber}.`;
    } else {
      resultParagraph.textContent = `Sorry, I was thinking of ${randomNumber}.`;
    }

    guessButton.textContent = "Guess Again";
  });
});
