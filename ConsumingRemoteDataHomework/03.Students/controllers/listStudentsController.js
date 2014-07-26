define(["jquery", "modules"], function ($, modules) {
    var url = modules.config.apiURL + "students";

    function run() {
        modules.view.load("listStudents")
       .then(function () {
            modules.request.get(url)
            .then(function (requestData) {
                console.log(requestData);
                $("#studentsList").loadTemplate(requestData.students);
            });
       });
    }

    return {
        run: run
    }
});