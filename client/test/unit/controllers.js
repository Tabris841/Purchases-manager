describe('Purchases controllers', function() {

	beforeEach(function() {
		this.addMatchers({
			toEqualData: function(expected) {
				return angular.equals(this.actual, expected);
			}
		});
	});

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

	describe('dayController', function() {
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

		it('should get days from database and assign them to days', function() {
			$httpBackend.flush();
			expect(sanitizeRestangularAll(scope.days)).toEqual(daysData());
		});
	});

	describe('purchasesController', function() {
		var scope, ctrl, $httpBackend, stateParams = {day: "Monday"}, state = "Monday",
			purchaseData = function() {
				return [{
					name: "Gift card",
					store: "Tesco",
					price: 4.50,
					description: "Some text",
					day: "Monday"
				}, {
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
			ctrl = $controller('purchasesController', {
				$scope: scope,
				$state: state,
				$stateParams: stateParams
			});
		}));

		it('should get purchases from database and assign them to purchase', function() {
			$httpBackend.flush();
			expect(sanitizeRestangularAll(scope.purchase)).toEqual(purchaseData());
		});

		it('should day be equal to current stae', function() {
			$httpBackend.flush();
			expect(scope.daysName).toEqual(stateParams.day);
		});
	});

	describe('addController', function() {
		var scope, ctrl, $httpBackend;

		beforeEach(inject(function(_$httpBackend_, $rootScope, $controller, $routeParams) {
			$httpBackend = _$httpBackend_;
			scope = $rootScope.$new();
			ctrl = $controller('addController', {
				$scope: scope
			});
		}));
	});

});