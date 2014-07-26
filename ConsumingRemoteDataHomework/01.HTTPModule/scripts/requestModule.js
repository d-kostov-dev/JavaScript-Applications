(function () {
    HTTP = (function () {
        var getHttpRequest,
            getJSON,
            makeRequest,
            postJSON;

        getHttpRequest = (function () {
            var xmlHttpFactories = [
                function () {
                    return new XMLHttpRequest();
                },
                function () {
                    return new ActiveXObject("Msxml3.XMLHTTP");
                },
                function () {
                    return new ActiveXObject("Msxml2.XMLHTTP.6.0");
                },
                function () {
                    return new ActiveXObject("Msxml2.XMLHTTP.3.0");
                },
                function () {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                },
                function () {
                    return new ActiveXObject("Microsoft.XMLHTTP");
                }
            ];

            return function () {
                var xmlFactory;

                for (var i = 0, len = xmlHttpFactories.length; i < len; i++) {
                    xmlFactory = xmlHttpFactories[i];

                    try {
                        return xmlFactory();
                    } catch (error) {
                        console.log(error)
                    }
                }

                return null;
            };
        })();

        makeRequest = function (options) {
            var deferred,
                httpRequest,
                requestUrl,
                type,
                success,
                error,
                contentType,
                accept,
                data;

            deferred = Q.defer();
            httpRequest = getHttpRequest();

            options = options || {};
            requestUrl = options.url;
            type = options.type || 'GET';
            contentType = options.contentType || '';
            accept = options.accept || '';
            data = options.data || null;

            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState === 4) {

                    switch (Math.floor(httpRequest.status / 100)) {
                        case 2:
                            deferred.resolve(JSON.parse(httpRequest.responseText))
                            break;
                        default:
                            deferred.reject(JSON.parse(httpRequest.responseText))
                            break;
                    }
                }
            };

            httpRequest.open(type, requestUrl, true);
            httpRequest.setRequestHeader('Content-Type', contentType);
            httpRequest.setRequestHeader('Accept', accept);
            httpRequest.send(data);

            return deferred.promise;
        };

        getJSON = function (url) {
            var options = {
                url: url,
                type: 'GET',
                contentType: 'application/json',
                accept: 'application/json',
            };

            return makeRequest(options);
        };

        postJSON = function (url, data) {
            var options = {
                url: url,
                type: 'POST',
                contentType: 'application/json',
                accept: 'application/json',
                data: JSON.stringify(data),
            };

            return makeRequest(options);
        };

        return {
            getJSON: getJSON,
            postJSON: postJSON
        };
    })();
}());