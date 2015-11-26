describe('purchasesService', function() {
	beforeEach(module('app'));

	var purchasesServices, $httpBackend, Restangular;

	beforeEach(inject(function(_purchasesService_, _Restangular_, _$httpBackend_) {
		purchasesService = _purchasesService_;
		Restangular = _Restangular_;
		$httpBackend = _$httpBackend_;
	}));

	afterEach(function() {
		$httpBackend.verifyNoOutstandingExpectation();
		$httpBackend.verifyNoOutstandingRequest();
	});

	it('getPurchases should make a GET request to backend for all purchases', function() {
		purchasesService.getPurchases();
		$httpBackend.expect('GET', 'http://localhost:9001/purchase').respond(200, []);
		$httpBackend.flush();
	});

	it('addPurchase should make POST request to backend for purchase', function() {
		purchasesService.addPurchase({});
		$httpBackend.expectPOST('http://localhost:9001/purchase').respond(201, '');	
		$httpBackend.flush();
	});

	it('editPurchase should make PUT request to backend for purchase', function() {
		purchasesService.editPurchase({});
		$httpBackend.expectPUT('http://localhost:9001/purchase/91').respond(202, '');	
		$httpBackend.flush();	
	});

	it('deletePurchase should make DELETE request to backend for purchase', function() {
		purchasesService.deletePurchase(1);
		$httpBackend.expectDELETE('http://localhost:9001/purchase/1').respond(202, '');
		$httpBackend.flush();
	});
});