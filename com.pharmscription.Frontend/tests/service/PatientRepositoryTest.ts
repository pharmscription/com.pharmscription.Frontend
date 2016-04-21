import angular from 'angular'
import app from 'ts/app'
import PatientRepository from 'ts/service/PatientRepository'
import Patient from 'ts/model/patient'
import Address from 'ts/model/address'
import 'angular-mocks'

describe('PatientRepositoryTest', () => {
    let $httpBackend: angular.IHttpBackendService;
    let PatientRepo: PatientRepository;
    let $injector: angular.auto.IInjectorService;
    let $rootScope: angular.IRootElementService;

    beforeEach(() => {
        module(app.name);
        //$injector = angular.injector(['ng', 'ngMockE2E']);
        //this.$httpBackend = $injector.get('$httpBackend');
        inject((_$rootScope_, _$httpBackend_, _PatientRepository_) => {
            $rootScope = _$rootScope_;
            $httpBackend = _$httpBackend_;
            PatientRepo = _PatientRepository_;
        });
    });
    console.log($rootScope);
    //this.$httpBackend.flush();
    //console.log($httpBackend);
    //let patients: Array<Patient> = [];
    //patients.push(new Patient(
    //    '756.1390.2077.81',
    //    'Max',
    //    'Muster',
    //    new Address('Bahnhostrasse', 666, 'ZH', 'Zürich', 8888),
    //    new Date(),
    //    '0980980980', 'max@muster.com',
    //    'xx-xx-xx',
    //    'Sanitas',
    //    '666'));

    //$httpBackend.whenGET(/\/patients\/ahv-number\/(.+)/, undefined, ['ahvNumber']).respond((method: string, url: string, data: any, headers: any, params: any) => {
    //    let found = patients.filter((patient: Patient) => { return patient.AhvNumber === params.ahvNumber })[0];
    //    if (found === undefined) {
    //        return [204, {}];
    //    } else {
    //        return [200, found, {}];
    //    }
    //});

    afterEach(()=> {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it("should initialize correctly", () => {
        expect(PatientRepo).toBeDefined();
    });

    //it("should return the searched Patient", () => {
    //    PatientRepo.getPatientByAhv('756.1390.2077.81').then((foundPatient) => {
    //        console.log(foundPatient);
    //    });
    //    expect(PatientRepo.getPatientByAhv('756.1390.2077.81')).toBeDefined();
    //});
});