import angular from 'angular'
import app from 'ts/app'
import PatientRepository from 'ts/service/PatientRepository'
import Patient from 'ts/model/patient'
import Address from 'ts/model/address'
import 'angular-mocks'

describe('PatientRepositoryTest', () => {
    let $httpBackend: angular.IHttpBackendService;
    let $http: angular.IHttpService;
    let $q: angular.IQService;
    let $log: angular.ILogService;
    let $rootScope: angular.IRootScopeService;
    let $injector: angular.auto.IInjectorService;
    let PatientRepo: PatientRepository;

    let patients: Array<Patient> = [];
    patients.push(new Patient(
        '756.1390.2077.81',
        'Max',
        'Muster',
        new Address('Bahnhostrasse', '666', 'ZH', 'Zürich', '8888'),
        new Date(),
        '0980980980', 'max@muster.com',
        'xx-xx-xx',
        'Sanitas',
        '666'));

    beforeEach(() => {
        $injector = angular.injector(['ng', 'ngMock']);
        $httpBackend = <angular.IHttpBackendService>$injector.get('$httpBackend');
        $http = <angular.IHttpService>$injector.get('$http');
        $q = <angular.IQService>$injector.get('$q');
        $log = <angular.ILogService>$injector.get('$log');
        $rootScope = <angular.IRootScopeService>$injector.get('$rootScope');
        PatientRepo = new PatientRepository($http, $q, $log);

    });

    beforeEach(() => {
        $httpBackend.whenGET(/\/patients\/(.+)/, undefined, ['id']).respond((method: string, url: string, data: any, headers: any, params: any) => {
            let found = patients.filter((patient: Patient) => { return patient.Id === params.id })[0];
            if (found === undefined) {
                return [204, {}];
            } else {
                return [200, found, {}];
            }
        });
    });
    
   afterEach(()=> {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should be defined", () => {
        expect(PatientRepo).toBeDefined();
    });

   it("should find mocked Patient", () => {
       let patient: Patient;
       PatientRepo.getPatientById('666').then((foundPatient) => {
           patient = foundPatient;
       }, (error) => {
           console.log('error');
       });
       $rootScope.$apply();
       $httpBackend.flush();
       expect(patient).toBeDefined();
    });

    //it("should return the searched Patient", () => {
    //    PatientRepo.getPatientByAhv('756.1390.2077.81').then((foundPatient) => {
    //        console.log(foundPatient);
    //    });
    //    expect(PatientRepo.getPatientByAhv('756.1390.2077.81')).toBeDefined();
    //});
});