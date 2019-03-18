// Let window load
window.onload = function () {

    // When the user presses the button...
    document.getElementById("start-button").addEventListener("click", function () {

        // Begin Game:
        var instrText = document.getElementById("instructions");
        var record = document.getElementById("wins-losses");
        var current = document.getElementById("current-word");
        var shadowWord = document.getElementById("shadow-word");
        var remGuesses = document.getElementById("guesses-remaining");
        var guessed = document.getElementById("already-guessed");

        // Array of words for game to choose from
        var words = ["one", "two", "three", "four"];

        // initialize dynamic variables
        var curWord;
        var userWord;
        var remaining;
        var lettersGuessed;

        // set wins and losses to 0
        var wins = 0;
        var losses = 0;

        // Create function to reset game
        function gameReset() {

            // Randomly choose a word
            curWord = words[Math.floor(Math.random() * words.length)].split("");

            // declare userWord var as empty string
            userWord = [];

            // fill userWord with underscores equal to the length of curWord
            for (var i = 0; i < curWord.length; i++) {
                userWord.push("_");
            }

            // set remaining (misses) to 10
            remaining = 10;

            // declare lettersGuessed var as empty string
            lettersGuessed = [];

            // Display instructions
            instrText.textContent = "Press a Key to Guess that Letter";

            // Display record
            record.textContent = "Wins-Losses: " + wins + "-" + losses;

            // Display "Current Word" and shadow of word
            current.textContent = "Current Word:";
            shadowWord.textContent = userWord;

            // Display Guesses remaining
            remGuesses.textContent = "Guesses Remaining\n" + remaining;

            // Display Letters already guessed
            guessed.textContent = "Letters Guessed\n" + lettersGuessed;

        }

        gameReset();

        // Listen for Keystrokes
        document.onkeyup = function (event) {

            // Declare var to hold user key
            var userGuess = event.key.toLowerCase();

            // If the key pressed is correct...
            if (curWord.includes(userGuess)) {

                // replace underscores with the correct guess
                for (var i = 0; i < userWord.length; i++) {
                    if (curWord[i] === userGuess) {
                        userWord[i] = userGuess;
                    }
                }

                // update DOM
                shadowWord.textContent = userWord;
            }

            // Otherwise, if the key has not already been guessed...
            else if (!lettersGuessed.includes(userGuess)) {

                // decrement remaining guesses
                remaining--;

                // add wrong guess to lettersGuessed
                lettersGuessed.push(userGuess);

                // update DOM
                remGuesses.textContent = "Guesses Remaining\n" + remaining;
                guessed.textContent = "Letters Guessed\n" + lettersGuessed;
            }

            // Check for game-ending situations

            // win:
            if (!userWord.includes("_")) {

                // Add to wins
                wins++;

                // Reset Game and Choose new word
                gameReset();
            }

            // else:
            else if (remaining == 0) {

                // Add to losses
                losses++;

                // Reset Game and Choose new word
                gameReset();
            }

        }

    });

}