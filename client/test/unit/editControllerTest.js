describe('editController', function() {
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
            index: 2
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
        ctrl = $controller('editController', {
            $scope: scope,
            $stateParams: stateParams,
            $state: state
        });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get all purchases from database', function() {
        $httpBackend.flush();
        expect(sanitizeRestangularAll(scope.purchase)).toEqual(purchaseData());
    });

    it('shoud get the id of the selected purchases and assign it to purchasesId', function() {
        $httpBackend.flush();
        expect(scope.purchaseId).toEqual(stateParams.index);
    });

    it('should find the purchase we want to edit and assign it to editPurchase', function() {
        $httpBackend.flush();
        expect(scope.editPurchase).toEqual(scope.purchase[1]);
    });

    it('should editPurchase be a function a send put request to the database', function() {
        $httpBackend.flush();
        scope.editPurchases();
        expect(typeof scope.editPurchases).toEqual('function');
        $httpBackend.expectPUT('http://localhost:9001/purchase/' + scope.purchaseId).respond(202, '');
        $httpBackend.flush();
    });
});