describe('addController', function() {
        beforeEach(module('app'));

        var scope, ctrl, $httpBackend, state, stateParams = {
                day: "Monday"
            };
                      
        beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
            $httpBackend = _$httpBackend_;
            scope = $rootScope.$new();
            ctrl = $controller('addController', {
                $scope: scope,
                $stateParams: stateParams,
                $state: state
            });  

            spyOn(scope, 'savePurchase');
        }));


        it('should selected day be equal to current state', function() {
            expect(scope.daysName).toEqual(stateParams.day);
        });

        it('should savePurchase be a called and send post request to purchases database', function() {
            scope.savePurchase();
            expect(scope.savePurchase).toHaveBeenCalled();
            $httpBackend.expectPOST('http://localhost:9001/purchase').respond(201, '');
       });
    }); 