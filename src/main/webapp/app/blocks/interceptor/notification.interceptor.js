(function() {
    'use strict';

    angular
        .module('cgserverApp')
        .factory('notificationInterceptor', notificationInterceptor);

    notificationInterceptor.$inject = ['$q', 'AlertService'];

    function notificationInterceptor ($q, AlertService) {
        var service = {
            response: response
        };

        return service;

        function response (response) {
            var headers = Object.keys(response.headers()).filter(function (header) {
                return header.endsWith('app-alert') || header.endsWith('app-params')
            }).sort();
            var alertKey = response.headers(headers[0]);
            if (angular.isString(alertKey)) {
                AlertService.success(alertKey, { param : response.headers(headers[1])});
            }
            return response;
        }
    }
})();
