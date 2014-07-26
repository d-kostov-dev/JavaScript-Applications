define(["jquery", "modules"], function ($, modules) {
    var studentInfo = {},
        url = modules.config.apiURL + "students";

    function run() {
        modules.view.load("addStudent")
        .then(function (data) {
            addEvents();
        });
    }

    function addEvents() {
        $("form").on("submit", function (event) {
            event.preventDefault();
            var self = $(this);

            $.each(self.serializeArray(), function (i, input) {
                studentInfo[input.name] = input.value;
            });

            addStudent();
        });
    }

    function addStudent() {
        //debugger;
        modules.request.post(url, JSON.stringify(studentInfo))
        .then(function (resultData) {
            modules.redirect("#/");
        }, function (error) {
            alert(error.Message);
        });
    }

    return {
        run: run
    }
});