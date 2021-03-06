angular.module('consider-me')
    .factory('xhr', function ($q, $http, config) {
        var xhrService = {};

        function getDefaultOptions() {
            return {
                method: 'GET'
            };
        }

        function constructPayload(payloadObj) {
            if (!angular.isObject(payloadObj)) {
                console.error('Invalid Parameter "payloadObj"');
            }
            else if (!payloadObj.url) {
                console.error('Missing Parameter "payloadObj.url"');
            }

            payloadObj.url = config.GET_BACKEND_URL() + payloadObj.url;
            return angular.extend({}, getDefaultOptions(), payloadObj);
        }

        function getServiceUrl(optsObj) {
            return optsObj.url;
        }

        function accept(data) {
            return $q.when(data);
        }

        function reject(data) {
            return $q.reject(data);
        }

        xhrService.call = function (options) {
            var finalOptions = constructPayload(options);

            return $http(finalOptions)
                .then(function successCallback(response) {
                    return accept(response.data);
                }, function errorCallback(response) {
                    return reject(response.data);
                });
        };

        return xhrService;
    });
