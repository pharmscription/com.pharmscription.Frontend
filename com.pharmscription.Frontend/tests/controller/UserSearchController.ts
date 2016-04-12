import * as angular from 'angular'
import 'angular-mocks'
import {UserSearchController} from 'ts/controller/UserSearchController'

angular.module('app', ['ngMock']).controller('UserSearchController', UserSearchController);

describe("UserSearchController", () => {
    let $controller: angular.IControllerService;
    let $httpBackend: angular.IControllerService;
    let $rootScope: angular.IRootScopeService;

    let controller: UserSearchController;

    beforeEach(() => {
        angular.module('app');
    });
    
    beforeEach(() => {
        angular.mock.inject(($injector: angular.auto.IInjectorService) => {

            $controller = <angular.IControllerService>$injector.get('$controller');
            $httpBackend = <angular.IControllerService>$injector.get('$httpBackend');
            $rootScope = <angular.IRootScopeService>$injector.get('$rootScope');
        });
    });

    beforeEach(() => {
        controller = <UserSearchController>$controller('UserSearchController', UserSearchController);
    });

    describe("Check Controller init", () => {
        expect(controller.social).toBe('');
    });
});
