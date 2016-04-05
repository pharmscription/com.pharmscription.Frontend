import Patient from '../../../ts/model/patient'
import IPromise = angular.IPromise;

export class PatientRepository {

    private urls: any = {
        add: 'http://localhost:7642/RestService.svc/patients'
    }

    private patients: Array<Patient>;

    static $inject = [
        '$http',
        '$q'
    ];

    constructor(private $http: angular.IHttpService, private $q: angular.IQService) {
        this.patients = [];
    }

    addPatient(patient: Patient): IPromise<Patient> {
        this.patients.push(patient);
        return new 
    }

    addwithreturnPatient(patient: Patient): IPromise<Patient> {
        //let config = { headers: { 'Content-Type': 'application/json'} };

        console.log(patient);
        return this.$q((resolve) => {
            resolve(this.$http.post(this.urls.add, patient));
        });
    }

    getPatient(ahvNumber: String): IPromise<Patient> {
        return this.$q((resolve) => {
            resolve(this.$http.get(this.urls.add));
        });
    }

}
