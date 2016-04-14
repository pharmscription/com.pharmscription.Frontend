//import * as angular from 'angular'
//import 'angular-material'
//import 'angular-mocks'
//import app from 'ts/app'
//import {UserSearchController} from 'ts/controller/UserSearchController'

//describe("UserSearchController", () => {
//    let $injector: angular.auto.IInjectorService;

//    let $controller: angular.IControllerService;
//    let $httpBackend: angular.IControllerService;
//    let $rootScope: angular.IRootScopeService;

//    let controller: UserSearchController;

//    beforeEach(() => {
//        angular.module(app.name);
//    });

    
//    beforeEach(() => {
//        angular.mock.inject(($injector: angular.auto.IInjectorService) => {

//            $controller = <angular.IControllerService>$injector.get('$controller');
//            $httpBackend = <angular.IControllerService>$injector.get('$httpBackend');
//            $rootScope = <angular.IRootScopeService>$injector.get('$rootScope');
//        });
//        let $scope = $rootScope.$new();
//    });

//    it("Check Controller init", () => {
//        let scope = {};

//        let controller = $controller(UserSearchController, { $scope: scope });

//        expect(scope.social).toBe('');
//    });
//});
