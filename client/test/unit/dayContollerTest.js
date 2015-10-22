describe('dayController', function() {
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
    var scope, ctrl, $httpBackend;
    daysData = function() {
        return [{
            day: "Monday"
        }, {
            day: "Tuesday"
        }];
    };

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
        $httpBackend = _$httpBackend_;
        $httpBackend.expectGET('http://localhost:9001/data').respond(daysData());
        scope = $rootScope.$new();
        ctrl = $controller('dayController', {
            $scope: scope
        });
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should get days from database and assign them to days', function() {
        $httpBackend.flush();
        expect(sanitizeRestangularAll(scope.days)).toEqual(daysData());
    });
});