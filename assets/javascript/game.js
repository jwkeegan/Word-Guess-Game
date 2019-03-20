// Let window load
window.onload = function () {

    // load theme audio
    var audioElement = document.createElement("audio");
    audioElement.setAttribute("src", "assets/media/theme.mp3");

    // listen for play and pause of theme song
    document.getElementById("theme-button").addEventListener("click", function() {
        audioElement.play();
    }),

    document.getElementById("pause-button").addEventListener("click", function() {
        audioElement.pause();
    }),

    // When the user presses the button...
    document.getElementById("start-button").addEventListener("click", function () {

        // Begin Game:
        var instrText = document.getElementById("instructions");
        var record = document.getElementById("wins-losses");
        var current = document.getElementById("current-word");
        var shadowWord = document.getElementById("shadow-word");
        var remGuesses = document.getElementById("guesses-remaining");
        var remLine = document.getElementById("remaining-line");
        var guessed = document.getElementById("already-guessed");
        var guessedLine = document.getElementById("letters-line");


        // Array of words for game to choose from
        var words = ["michael", "dwight", "jim", "pam", "ryan", "andy", "jan", 
         "roy", "stanley", "kevin", "meredith", "angela", "oscar", "phyllis", 
         "kelly", "toby", "creed", "darryl", "erin", "gabe", "holly"];

        // initialize dynamic variables
        var curWord;
        var userWord;
        var remaining;
        var lettersGuessed;
        var wins = 0;
        var losses = 0;

        // Create function to print word to guess with blanks
        function printWord(word) {
            
            // create string to be returned later
            var str = "";

            // check that word isn't empty
            if (word.length > 0) {

                // add first letter to str
                str = str + word[0];

                // for the rest of the word, add spaces between each letter and add
                for (var i = 1; i < word.length; i++) {
                    str = str + " " + word[i];
                }
                
            }

            // return str
            return str;
        }

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
            instrText.textContent = "Guess the Character's Name!";

            // Display record
            record.textContent = "Wins-Losses: " + wins + "-" + losses;

            // Display "Current Word" and shadow of word
            current.textContent = "Current Word:";
            shadowWord.textContent = printWord(userWord);

            // Display Guesses remaining
            remGuesses.textContent = "Guesses Remaining:";
            remLine.textContent = remaining;

            // Display Letters already guessed
            guessed.textContent = "Letters Guessed:";
            guessedLine.textContent = printWord(lettersGuessed);

        }

        gameReset();

        // Set array of keys to listen for
        var validLetters = ["a", "b", "c", "d", "e", "f", "g", 
        "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", 
        "s", "t", "u", "v", "x", "y", "z"];

        // Listen for Keystrokes
        document.onkeyup = function (event) {

            // Declare var to hold user key
            var userGuess = event.key.toLowerCase();

            // Make sure key is a letter
            if (!validLetters.includes(userGuess)) {
                return;
            }

            // If the key pressed is correct...
            if (curWord.includes(userGuess)) {

                // replace underscores with the correct guess
                for (var i = 0; i < userWord.length; i++) {
                    if (curWord[i] === userGuess) {
                        userWord[i] = userGuess;
                    }
                }

                // update DOM
                shadowWord.textContent = printWord(userWord);
            }

            // Otherwise, if the key has not already been guessed...
            else if (!lettersGuessed.includes(userGuess)) {

                // decrement remaining guesses
                remaining--;

                // add wrong guess to lettersGuessed
                lettersGuessed.push(userGuess);

                // update DOM
                remGuesses.textContent = "Guesses Remaining:";
                remLine.textContent = remaining;
                guessed.textContent = "Letters Guessed:";
                guessedLine.textContent = printWord(lettersGuessed);
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