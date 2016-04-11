import 'angular-mocks'
import app from './app'
import Papa = require('papaparse');
import Patient from 'ts/model/patient';
import Drug from "ts/model/drug";

export class AppDev {
    app: ng.IModule;

    constructor(name: string, modules: Array<string>) {
        this.app = angular.module(name, modules);
        this.app.run(this.init);
    }

    init($httpBackend: angular.IHttpBackendService) {
        let patients: Array<Patient> = [];
        let drugs: Array<Drug> = [];

        Papa.parse('http://localhost:3474/mock/Drugs.csv', {
            download: true,
            header: true,
            encoding: "UTF-8",
            complete: function(result) {
                console.log('parsed');
                drugs = result.data;
                console.log(drugs[0]);
            }
        });
        
        let backendUrl = 'http://localhost:7642/RestService.svc';

        $httpBackend.whenGET(/\/ahv-number\/(.+)/, undefined, ['ahvNumber']).respond((method, url, data, headers, params) => {
           let found = patients.filter((patient: Patient) => { return patient.AhvNumber === params.ahvNumber })[0];
            if (found === undefined) {
                return [200, new Patient(null), {}];
            } else {
                return [200, found, {}];
            }
        });

        $httpBackend.whenGET(/\/drugs\/search\/(.+)/, undefined, ['searchTerm']).respond((method, url, data, headers, params) => {
           let found = drugs.filter((drug: Drug) => {
                if (drug.DrugDescription === undefined || drug.DrugDescription === null)
                    return false;
                return drug.DrugDescription.indexOf(params.searchTerm) !== -1;
            });
            if (found === undefined) {
                return [200, new Drug(), {}];
            } else {
                return [200, found, {}];
            }
        });

        $httpBackend.whenGET(/\/drugs\/search\/numitems\/(.+)/, undefined, ['searchTerm']).respond((method, url, data, headers, params) => {
            let found = drugs.filter((drug: Drug) => {
                if (drug.DrugDescription === undefined || drug.DrugDescription === null)
                    return false;
                return drug.DrugDescription.indexOf(params.searchTerm) !== -1;
            });
            if (found === undefined || found === null) {
                return [200, 0, {}];
            } else {
                return [200, found.length, {}];
            }
        });

        $httpBackend.whenGET(/\/drugs\/search\/(.+)\/(.+)-(.+)/, undefined, ['searchTerm', 'numItems', 'page']).respond((method, url, data, headers, params) => {
            let found = drugs.filter((drug: Drug) => {
                if (drug.DrugDescription === undefined || drug.DrugDescription === null)
                    return false;
                return drug.DrugDescription.indexOf(params.searchTerm) !== -1;
            });
            let drugPage = found.slice((params.numItems * (params.page - 1) - 1), (params.numItems * (params.page) - 1));

            if (drugPage === undefined || drugPage === null) {
                return [200, new Drug(), {}];
            } else {
                return [200, drugPage, {}];
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