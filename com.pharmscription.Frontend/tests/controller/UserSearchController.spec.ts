import * as angular from 'angular'
import 'angular-material'
import 'angular-mocks'
import UserSearchController from 'ts/controller/UserSearchController'
import AHVNumberService from 'ts/service/AHVNumberService'
import PatientRepository from 'ts/service/PatientRepository'
import PatientService from 'ts/service/PatientService'

describe("UserSearchController", () => {
    let $httpBackend: angular.IControllerService;
    let $injector: angular.auto.IInjectorService;
    let $rootScope: angular.IRootScopeService;
    let $mdDialog: angular.material.IDialogService;
    let $mdToast: angular.material.IToastService;
    let $location: angular.ILocationService;
    let $http: angular.IHttpService;
    let $q: angular.IQService;
    let $log: angular.ILogService;

    let controller: UserSearchController;
    let AHVNumberSer: AHVNumberService;
    let PatientRepo: PatientRepository;
    let PatientSer: PatientService;

    beforeEach(() => {
        $injector = angular.injector(['ng', 'ngMock', 'ngMaterial']);
        $mdDialog = <angular.material.IDialogService>$injector.get('$mdDialog');
        $mdToast = <angular.material.IToastService>$injector.get('$mdToast');
        $location = <angular.ILocationService>$injector.get('$location');


        AHVNumberSer = new AHVNumberService();
        PatientRepo = new PatientRepository($http, $q, $log);
        PatientSer = new PatientService();

        controller = new UserSearchController($mdDialog, $mdToast, $location, AHVNumberSer, PatientRepo, PatientSer, $log);
    });

    it('should be initialized', () => {
        expect(controller).toBeDefined();
    });

    it('should search a Patient', () => {
        
    });

});
