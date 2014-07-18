/// <reference path="libs/jquery.js" />

(function () {
    require.config({
        paths: {
            "jquery": "libs/jquery",
            "handlebars": "libs/handlebars",
            "underscore": "libs/underscore",
            "templateModule": "templateModule",
            "data": "data",
            "functions": "functions"
        }
    });

    require(["jquery", "data", "functions", "templateModule"], function ($, data, filters) {
        // I AM TOTALLY EXPERIMENTING HERE
        // Populate the DOM tree with data
        $("#mainDiv").templateModule(data);

        // Change data by some of the filters
        $("body").on("click", "button", function () {
            var self = $(this),
                filterType = self.data("info"),
                newData,
                contentContainer = $("#mainDiv");

            // Clear the main div to show the new data.
            contentContainer.empty();

            // Filter the data.
            newData = filters[filterType](data);

            // Show the new data in the mainDiv
            contentContainer.templateModule(newData);
        });
    });
}());