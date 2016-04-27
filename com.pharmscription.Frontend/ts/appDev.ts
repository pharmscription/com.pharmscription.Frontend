import 'angular-mocks'
import app from './app'
import Papa = require('papaparse');
import Patient from 'ts/model/patient'
import Drug from 'ts/model/drug'
import DrugItem from 'ts/model/drugitem'
import Address from 'ts/model/address'
import Prescription from 'ts/model/prescription'
import Doctor from 'ts/model/doctor'
import Dispense from 'ts/model/dispense'

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

        let doctors: Array<Doctor> = [];
        doctors.push(new Doctor(
            '1234.123.123.12',
            'Hippo',
            'Krates',
            new Address(
                'Greekstr.',
                99,
                'AT',
                'Athen',
                4253
            ), '643.234.534',
            '0980980980',
            '1231231231'
        ));

        let drugs: Array<Drug> = [];
        let prescriptions: Array<Prescription> = [];
        let createPrescription = () => {
            prescriptions.push(new Prescription(
                patients[0],
                doctors[0],
                [new DrugItem(drugs[5], "0/1/0/1", 2, "12443535342"), new DrugItem(drugs[6], "0/1/0/1", 5, "8732783478")],
                "N",
                new Date(),
                new Date(),
                true,
                [],
                new Date(2016, 7, 15),
                [],
                [],
                "00123"
            ));
            prescriptions.push(new Prescription(
                patients[0],
                doctors[0],
                [new DrugItem(drugs[5], "0/1/0/1", 2, "12443535342"), new DrugItem(drugs[6], "0/1/0/1", 5, "8732783478")],
                "N",
                new Date(),
                new Date(),
                true,
                [],
                new Date(2016, 7, 15),
                [],
                [new Dispense(new Date(), "kein Kommentar", [new DrugItem(drugs[6], "0/1/0/1", 2, "8732783478")], null, null, "2343243432432432"),
                    new Dispense(new Date(), "kein Kommentar", [new DrugItem(drugs[6], "0/1/0/1", 1, "8732783478")], null, null, "12412321321324")],
                "001234"
            ));
        }

        Papa.parse('http://localhost:3474/mock/Drugs.csv', {
            download: true,
            header: true,
            encoding: "UTF-8",
            complete: function(result) {
                drugs = result.data;
                createPrescription();
            }
        });

        let backendUrl = 'http://localhost:7642';

        /* TODO:
            Patients:
            GET     /patients/lookup/{ahv}
            DELETE  /patients/{id}

            Prescriptions:
            GET     /patients/{id}/prescriptions/{id}/counterproposals
            PUT     /patients/{id}/prescriptions/{id}/counterproposals
            GET     /patients/{id}/prescriptions/{id}/counterproposals/{id}
            GET     /patients/{id}/prescriptions/{id}/dispenses
            PUT     /patients/{id}/prescriptions/{id}/dispenses
            GET     /patiens/{id}/prescriptions/{id}/drugs
            GET     /patiens/{id}/prescriptions/{id}/drugs/{id}

            Drugs:
            GET     /drugs/{id}

            Login:
            POST    /login
            POST    /password/change
            POST    /password/reset/{shared-secret}
        */

        /*
            GET     /drugs/search/count/{keyword}
        */
        $httpBackend.whenGET(/\/drugs\/search\/count\/(.+)/, undefined, ['searchTerm']).respond((method: string, url: string, data: any, headers: any, params: any) => {
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

        /*
            GET     /drugs/search/{keyword}/{page}/{amount}
        */
        $httpBackend.whenGET(/\/drugs\/search\/(.+)\/(.+)\/(.+)/, undefined, ['searchTerm', 'page', 'pageSize']).respond((method: string, url: string, data: any, headers: any, params: any) => {
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
                return [204, {}];
            } else {
                return [200, drugPage, {}];
            }
        });

        /*
            GET     /drugs/search/{keyword}
        */
        $httpBackend.whenGET(/\/drugs\/search\/(.+)/, undefined, ['searchTerm']).respond((method: string, url: string, data: any, headers: any, params: any) => {
           let found = drugs.filter((drug: Drug) => {
                if (drug.DrugDescription === undefined || drug.DrugDescription === null)
                    return false;
                return drug.DrugDescription.indexOf(params.searchTerm) !== -1;
            });
            if (found === undefined) {
                return [204, {}];
            } else {
                return [200, found, {}];
            }
        });

        /*
            PUT     /patients/{id}/prescriptions
        */
        $httpBackend.whenPUT(/\/patients\/(.+)\/prescriptions/).respond((method: string, url: string, data: string) => {
            let newPrescription: Prescription = angular.fromJson(data);
            newPrescription.Id = Math.floor((Math.random() * 10000) + 1).toString();
            newPrescription.Drugs.forEach((drug: DrugItem) => {
                drug.Id = Math.floor((Math.random() * 1000000) + 1).toString();
            });
            prescriptions.push(newPrescription);
            return [200, newPrescription, {}];
        });

        /*
            PUT     /patients
        */
        $httpBackend.whenPUT(/\/patients/).respond((method:string, url:string, data: string) => {
            let patient: Patient = angular.fromJson(data);
            patient.Id = Math.floor((Math.random() * 10000) + 1).toString();
            patients.push(patient);
            return [200, data, {}];
        });

        /*
            POST    /patients/{id}
        */

        $httpBackend.whenPOST(/\/patients\/(.+)/, undefined, undefined, ['patientId'] ).respond((method: string, url: string, data: string) => {
            let patient: Patient = angular.fromJson(data);
            let patientPosition = patients.map((p: Patient) => { return p.Id }).indexOf(patient.Id);
            patients[patientPosition] = patient;
            return [200, data, {}];
        });


        /*
            GET     /patients/{id}/prescriptions/{id}
        */
        $httpBackend.whenGET(/\/patients\/(.+)\/prescriptions\/(.+)/, undefined, ['patientId', 'prescriptionId']).respond((method: string, url: string, data: any, headers: any, params: any) => {
            let patientPrescriptions = prescriptions.filter((prescription: Prescription) => {
                return prescription.Patient.Id === params.patientId;
            });
            let specificPrescription = patientPrescriptions.filter((prescription: Prescription) => {
                return prescription.Id === params.prescriptionId;
            })[0];
            if (specificPrescription === undefined) {
                return [204, {}];
            }
            return [200, specificPrescription, {}];
        });

        /*
            GET     /patients/{id}/prescriptions
        */
        $httpBackend.whenGET(/\/patients\/(.+)\/prescriptions/, undefined, ['patientId']).respond((method: string, url: string, data: any, headers: any, params: any) => {
            let foundPrescriptions = prescriptions.filter((prescription: Prescription) => {
                return prescription.Patient.Id === params.patientId;
            });
            if (foundPrescriptions === undefined) {
                return [204, {}];
            }
            return [200, foundPrescriptions, {}];
        });

        /*
            GET     /patients/ahv-number/{ahv}
        */
        $httpBackend.whenGET(/\/patients\/ahv-number\/(.+)\//, undefined, ['ahvNumber']).respond((method: string, url: string, data: any, headers: any, params: any) => {
           let found = patients.filter((patient: Patient) => { return patient.AhvNumber === params.ahvNumber })[0];
            if (found === undefined) {
                return [204, {}];
            } else {
                return [200, found, {}];
            }
        });

        /*
            GET     /patients/{id}
        */
        $httpBackend.whenGET(/\/patients\/(.+)/, undefined, ['id']).respond((method: string, url: string, data: any, headers: any, params: any) => {
            let found = patients.filter((patient: Patient) => { return patient.Id === params.id })[0];
            if (found === undefined) {
                return [204, {}];
            } else {
                return [200, found, {}];
            }
        });

        $httpBackend.whenGET(/.html/).passThrough();
    };
}

export default new AppDev('appDev', [app.name, 'ngMockE2E']).app;