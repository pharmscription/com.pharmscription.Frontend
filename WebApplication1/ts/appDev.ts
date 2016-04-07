import Patient from './model/patient';
import 'angular-mocks'
import app from './app'

export class AppDev {
    app: ng.IModule;

    constructor(name: string, modules: Array<string>) {
        this.app = angular.module(name, modules);
        this.app.run(this.init);
    }

    init($httpBackend: angular.IHttpBackendService) {
        let patients: Array<Patient> = [];

        let backendUrl = 'http://localhost:7642/RestService.svc';

        $httpBackend.whenGET(/\/ahv-number\/(.+)/, undefined, ['ahvNumber']).respond((method, url, data, headers, params) => {
            console.log(params.ahvNumber);
            let found = patients.filter((patient: Patient) => { return patient.AhvNumber === params.ahvNumber })[0];
            if (found === undefined) {
                return [200, new Patient(null), {}];
            } else {
                return [200, found, {}];
            }
        });

        $httpBackend.whenPUT(backendUrl + '/patients').respond((method:string, url:string, data: string) => {
            let patient: Patient = angular.fromJson(data);
            console.log(patient);
            patients.push(patient);
            return [200, data, {}];
        });

        $httpBackend.whenGET(/.html/).passThrough();
    };
}

export default new AppDev('appDev', [app.name, 'ngMockE2E']).app;