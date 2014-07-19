define(["jquery", "settings"], function ($, settings) {
    var secretNumber = [],
        numberOfGuesses = 0; // Less is better

    // Returns a random integer between min and max
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Loads the given html file into the index.html file
    function loadView(view) {
        $(settings.containerSettings.selector).load(settings.containerSettings.folder + view);
    }

    // Generates a 4 digit number with non repeating random numbers with first index different than zero.
    function getSecretNumber() {
        for (var i = 0; i < 4; i++) {
            if (i === 0) {
                secretNumber.push(getRandomInt(1, 9));
            } else {
                var currentSecretNumber = getRandomInt(0, 9);

                while (secretNumber.indexOf(currentSecretNumber) > -1) {
                    currentSecretNumber = getRandomInt(0, 9);
                }

                secretNumber.push(currentSecretNumber);
            }
        }

        return secretNumber;
    }

    // Checks if the user guess input is correct.
    function isValidGuess(guess) {
        if (guess.length !== 4) {
            return false;
        }

        // Check if number is repeating.
        for (var i = 0; i < 4; i++) {
            var currentNum = guess[i];

            for (var j = i + 1; j < 4; j++) {
                if (currentNum === guess[j]) {
                    return false;
                }
            }
        }

        return true;
    }

    // Checks if the username input is correct.
    function isValidName(name) {
        if (typeof name === "string" && name.length < 12) {
            return true;
        }

        return false;
    }

    function showGuessResult(guess) {
        var guessResult = calculateGuessResult(guess),
            resultToShow = $("<li></li>");

        numberOfGuesses++;

        console.log(numberOfGuesses);

        if (guessResult.ram === 4) {
            localStorage.setItem(sessionStorage.getItem("username"), numberOfGuesses);
            loadView("congrats.html")
        }

        resultToShow.append("<span></span>").html(guess.join(" "));

        for (var i = 0; i < guessResult.sheep; i++) {
            resultToShow.append("<img src='images/sheep.png'/>");
        }

        for (var i = 0; i < guessResult.ram; i++) {
            resultToShow.append("<img src='images/ram.png'/>");
        }

        $(settings.resultContainer).prepend(resultToShow);
    }

    // Calculate Sheeps and Rams
    function calculateGuessResult(guess) {
        var result = {
            sheep: 0,
            ram: 0
        };

        for (var i = 0; i < 4; i++) {
            var currentGuessNumber = guess[i],
                indexInSecretNumber = secretNumber.indexOf(currentGuessNumber);

            if (indexInSecretNumber > -1) {
                if (indexInSecretNumber === i) {
                    result.ram++;
                } else {
                    result.sheep++;
                }
            }
        }

        return result;
    }

    return {
        loadView: loadView,
        getSecretNumber: getSecretNumber,
        isValidName: isValidName,
        isValidGuess: isValidGuess,
        showGuessResult: showGuessResult
    }
});