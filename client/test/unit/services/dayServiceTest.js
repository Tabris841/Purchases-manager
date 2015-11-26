describe('dayService' , function() {
	beforeEach(module('app'));

	var purchasesServices, $httpBackend, Restangular;

	beforeEach(inject(function(_dayService_, _Restangular_, _$httpBackend_) {
		dayService = _dayService_;
		Restangular = _Restangular_;
		$httpBackend = _$httpBackend_;
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('dayService should make a GET request to backend for all purchases', function() {
		dayService.getDays();
		$httpBackend.expect('GET', 'http://localhost:9001/data').respond(200, []);
		$httpBackend.flush();
	});

});