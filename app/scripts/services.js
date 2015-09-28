(function() {
    angular.module("purchasesApp").factory("Days",
        ["Restangular", function(Restangular) {
            var service = Restangular.service("days");
            service.validateData = function(day) {
            };
            return service;
        }]);
}());