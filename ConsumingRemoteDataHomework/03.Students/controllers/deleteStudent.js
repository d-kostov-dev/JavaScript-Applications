define(["jquery", "modules"], function ($, modules) {
    var url = modules.config.apiURL + "students/";

    function run(id) {
        modules.request.post(url + id, { _method: 'delete' }, null)
        .then(function () {
            modules.redirect("#/");
        });
    }

    return {
        run: run
    }
});