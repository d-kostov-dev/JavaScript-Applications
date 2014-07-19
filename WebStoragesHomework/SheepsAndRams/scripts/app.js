/// <reference path="libs/jquery.js" />

(function () {
    require.config({
        urlArgs: "bust=" + (new Date()).getTime(),
        paths: {
            "jquery": "libs/jquery",
            "underscore": "libs/underscore",
            "settings": "settings",
            "functions": "functions"
        }
    });

    require(["jquery", "functions", "settings"], function ($, functions, settings) {
        var username = sessionStorage.getItem("username"),
            secretNumber;

        // If username exists it will show him the game page. 
        // By using sessionSotrage every new loading of the page will require username.
        // Reload will start a new game
        if (username) {
            secretNumber = functions.getSecretNumber();
            functions.loadView("game.html");
        } else {
            functions.loadView("welcome.html");
        }


        $("section").on("click", "button", function () {
            var self = $(this);

            if (self.hasClass(settings.newGameButton)) {
                var nameInput = $("[name='username']"),
                    username = nameInput.val();

                if (functions.isValidName(username)) {
                    sessionStorage.setItem("username", username);
                    secretNumber = functions.getSecretNumber();
                    functions.loadView("game.html");
                    console.log(secretNumber);
                } else {
                    nameInput.val("");
                    alert("Please enter a valid name! Max 12 characters!")
                }
            }

            if (self.hasClass(settings.guessButton)) {
                var guessInput = $("[name='guess']"),
                    userGuess = guessInput.val().split("").map(Number);

                if (functions.isValidGuess(userGuess)) {
                    functions.showGuessResult(userGuess);
                } else {
                    alert("Please enter 4 digits number without repeating any digit!")
                }

                guessInput.val("");
            }
        });

    });
}());