import Patient from '../model/patient'

import IPromise = angular.IPromise;

export class PatientRepository {

    private urls: any = {
        add: '/api/patient'
    }

    static $inject = [
        '$http',
        '$q'
    ];

    constructor(private $http: angular.IHttpService, private $q: angular.IQService) {
    }

    addPatient(patient: Patient): IPromise<Patient> {
        return this.$q((resolve) => {
            resolve(this.$http.post(this.urls.add, patient));
        });
    }

    getPatient(): IPromise<Patient> {
        return this.$q((resolve) => {
            resolve(this.$http.get(this.urls.add));
        });
    }

}
