//import * as angular from 'angular'
//import 'angular-material'
//import 'angular-mocks'
//import app from 'ts/app'
//import {UserSearchController} from 'ts/controller/UserSearchController'
//describe("UserSearchController", () => {
//    let $controller: angular.IControllerService;
//    let $httpBackend: angular.IControllerService;
//    let $rootScope: angular.IRootScopeService;
//    let $mdDialog: angular.material.IDialogService;
//    let scope: angular.IScope;
//    let createController: Function;
//    let controller: UserSearchController;
//    beforeEach(() => {
//        angular.mock.module(app.name);
//        angular.mock.module(($provide) => {
//            $provide.value('$mdDialog', $mdDialog);
//        });
//    });
//    beforeEach(() => {
//        angular.mock.inject(($rootScope, $controller, _$mdDialog_) => {
//            $mdDialog = _$mdDialog_;
//            //$httpBackend = <angular.IControllerService>$injector.get('$httpBackend');
//            //$rootScope = <angular.IRootScopeService>$injector.get('$rootScope');
//            scope = $rootScope.$new();
//            $controller('UserSearchController', {'$scope': scope });
//            scope.$digest();
//        });
//        });
//    it("Check Controller init", () => {
//        expect(scope.social).toBe('');
//    });
//});
