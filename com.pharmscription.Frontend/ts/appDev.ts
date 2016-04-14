import 'angular-mocks'
import app from './app'
import Papa = require('papaparse');
import Patient from 'ts/model/patient';
import Drug from "ts/model/drug";
import Address from 'ts/model/address'

export class AppDev {
    app: ng.IModule;

    constructor(name: string, modules: Array<string>) {
        this.app = angular.module(name, modules);
        this.app.run(this.init);
    }

    init($httpBackend: angular.IHttpBackendService) {
        let patients: Array<Patient> = [];
        patients.push(new Patient(
            '756.1390.2077.81',
            'Max',
            'Muster',
            new Address('Bahnhostrasse', 666, 'ZH', 'Zürich', 8888),
            new Date(),
            '0980980980', 'max@muster.com',
            'xx-xx-xx',
            'Sanitas',
            '666'));

        let drugs: Array<Drug> = [];

        Papa.parse('http://localhost:3474/mock/Drugs.csv', {
            download: true,
            header: true,
            encoding: "UTF-8",
            complete: function(result) {
                drugs = result.data;
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

        $httpBackend.whenGET(/\/drugs\/numitems\/(.+)/, undefined, ['searchTerm']).respond((method, url, data, headers, params) => {
            let found = drugs.filter((drug: Drug) => {
                if (drug.DrugDescription === undefined || drug.DrugDescription === null)
                    return false;
                return drug.DrugDescription.indexOf(params.searchTerm) !== -1;
            });
            let foundLength = found.length;
            if (foundLength === undefined) {
                return [200, 0, {}];
            } else {
                return [200, foundLength, {}];
            }
        });

        $httpBackend.whenGET(/\/drugs\/fetchpage\/(.+)\/(.+)\/(.+)/, undefined, ['searchTerm', 'pageSize', 'page']).respond((method, url, data, headers, params) => {
            let found = drugs.filter((drug: Drug) => {
                if (drug.DrugDescription === undefined || drug.DrugDescription === null)
                    return false;
                return drug.DrugDescription.indexOf(params.searchTerm) !== -1;
            });
            let pageOffset = params.pageSize * params.page;
            let pageOffsetEnd = pageOffset + parseInt(params.pageSize);
            console.debug("Slice from: " + pageOffset + " to: " + pageOffsetEnd);
            let drugPage = found.slice(pageOffset, pageOffsetEnd);
            if (drugPage === undefined || drugPage === null) {
                return [200, new Drug(), {}];
            } else {
                return [200, drugPage, {}];
            }
        });

        $httpBackend.whenPUT(backendUrl + '/patients').respond((method:string, url:string, data: string) => {
            let patient: Patient = angular.fromJson(data);
            patients.push(patient);
            return [200, data, {}];
        });

        $httpBackend.whenGET(/.html/).passThrough();
    };
}

export default new AppDev('appDev', [app.name, 'ngMockE2E']).app;