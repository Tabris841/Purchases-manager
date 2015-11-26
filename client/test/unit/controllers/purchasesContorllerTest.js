describe('purchasesController', function() {
    function sanitizeRestangularAll(items) {
        var all = _.map(items, function(item) {
            return sanitizeRestangularOne(item);
        });
        return sanitizeRestangularOne(all);
    }

    function sanitizeRestangularOne(item) {
        return _.omit(item, "save", "fromServer", "oneUrl", "restangularized", "allUrl", "plain", "several", "reqParams", "clone", "withHttpConfig", "getRequestedUrl", "getParentList", "route", "parentResource", "getList", "get", "post", "put", "remove", "head", "trace", "options", "patch",
            "$get", "$save", "$query", "$remove", "$delete", "$put", "$post", "$head", "$trace", "$options", "$patch",
            "$then", "$resolved", "restangularCollection", "customOperation", "customGET", "customPOST",
            "customPUT", "customDELETE", "customGETLIST", "$getList", "$resolved", "restangularCollection", "one", "all", "doGET", "doPOST",
            "doPUT", "doDELETE", "doGETLIST", "addRestangularMethod", "getRestangularUrl");
    }

    beforeEach(module('app'));

    var scope, ctrl, $httpBackend, state, stateParams = {
            day: "Monday"
        },
        purchaseData = function() {
            return [{
                id: 1,
                name: "Gift card",
                store: "Tesco",
                price: 4.50,
                description: "Some text",
                day: "Monday"
            }, {
                id: 2,
                name: "Batteries",
                store: "Walmart",
                price: 9.99,
                description: "Some text",
                day: "Tuesday"
            }];
        };

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('http://localhost:9001/purchase').respond(purchaseData());
        scope = $rootScope.$new();
        state = jasmine.createSpyObj('$state', ['go']);
        ctrl = $controller('purchasesController', {
            $scope: scope,
            $stateParams: stateParams,
            $state: state
        });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get purchases from database and assign them to purchase', function() {
        $httpBackend.flush();
        expect(sanitizeRestangularAll(scope.purchase)).toEqual(purchaseData());
    });

    it('should selected day be equal to current state', function() {
        $httpBackend.flush();
        expect(scope.daysName).toEqual(stateParams.day);
    });

    it('should deletePurchase be a function and send delete request to purchases database', function() {
        $httpBackend.flush();
        scope.deletePurchase(1);
        expect(typeof scope.deletePurchase).toEqual('function');
        $httpBackend.expectDELETE('http://localhost:9001/purchase/1').respond(202, '');
        $httpBackend.flush();
    });
});