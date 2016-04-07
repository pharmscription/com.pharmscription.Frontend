import Patient from '../model/patient'

import IPromise = angular.IPromise;

export class PatientRepository {

    private urls: any = {
        add: 'http://localhost:7642/RestService.svc/patients',
        get: 'http://localhost:7642/RestService.svc/patients/lookup/:ahvNumber'
    }

    static $inject = [
        '$http',
        '$q'
    ];

    constructor(private $http: angular.IHttpService, private $q: angular.IQService) {
    }

    addPatient(patient: Patient): IPromise<Patient> {
        let data = JSON.stringify(patient);
        console.log(data);
        return this.$q((resolve) => {
            resolve(this.$http.put(this.urls.add, data));
        });

    }
    addwithreturnPatient(patient: Patient): IPromise<Patient> {
        console.log(patient);
        return this.$q((resolve) => {
            resolve(this.$http.post(this.urls.add, patient));
        });
    }

    getPatient(ahvNumber: string): IPromise<Patient> {
        return this.$q((resolve) => {
            let getUrl = this.urls.get.replace(':ahvNumber', ahvNumber);
            console.log(getUrl);
            resolve(this.$http.get(getUrl));
        });
    }

}

