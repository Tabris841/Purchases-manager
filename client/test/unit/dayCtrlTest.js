describe('dayController', function() {
	beforeEach(module('app'));

	it('shoud create an array of all days', inject(function($controller) {
		var scope = {},
		    ctrl = $controller('dayController', {$scope:scope});

		expect(scope.days).not.toBeDefined();  
		expect(scope.selectedIndex).toBe(0);
	}));
});