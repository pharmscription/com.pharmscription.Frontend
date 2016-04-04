import Patient from '../model/patient'

import IPromise = angular.IPromise;

export class PatientRepository {

    private urls: any = {
        add: 'http://localhost:7642/RestService.svc/patients'
    }

    static $inject = [
        '$http',
        '$q'
    ];

    constructor(private $http: angular.IHttpService, private $q: angular.IQService) {
    }

    addPatient(patient: Patient): void {
        let data = JSON.stringify(patient);
        console.log(data);
        this.$http.put(this.urls.add, data).then((promiseValue) => {
            console.log('Worked!');
            console.log(promiseValue);
        }, (reason) => {
            console.log(reason);
        });
    }
    addwithreturnPatient(patient: Patient): IPromise<Patient> {
        //let config = { headers: { 'Content-Type': 'application/json'} };

        console.log(patient);
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
