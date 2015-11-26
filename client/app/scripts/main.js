(function() {
    var app = angular.module('app', ['ui.router', 'restangular', 'ui.bootstrap']),
        dayCtrl = require('./controllers/dayCtrl'),
        purchasesCtrl = require('./controllers/purshasesCtrl');
        editCtrl = require('./controllers/editCtrl');
        addCtrl = require('./controllers/addCtrl'); 
        purchasesService = require('./services/purchaseService');
        dayService = require('./services/dayService');

    app.config(function($stateProvider, $urlRouterProvider, RestangularProvider) {
        RestangularProvider.setBaseUrl('http://localhost:9001');

        $stateProvider           
            .state('Purchases', {
                url: "/{day}",
                templateUrl: "views/table.html",
                controller: 'purchasesController'
            })
            .state('Purchases.add', {
                url: "/addPurchase",
                onEnter: function ($modal, $state) {
                    $modal.open({
                        templateUrl: "views/addPurchase.html",
                        controller: 'addController',
                        size: 'lg'
                    }).result.finally(function() {
                        $state.go('Purchases');
                    });                    
                }
            })
            .state('Purchases.edit', {
                url: "/editPurchase/{index}",
                onEnter: function($modal, $state) {
                    $modal.open({
                        templateUrl: "views/editPurchase.html",
                        controller:  'editController',
                        size: 'lg'
                    }).result.finally(function() {
                        $state.go('Purchases');
                    });
                }  
            });
    });
}());