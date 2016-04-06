import Patient from '../../../ts/model/patient'
import IPromise = angular.IPromise;

export class PatientRepository {

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
        return this.$q((resolve) => {
            resolve(this.patients[this.patients.length - 1]);
        });
    }

    //getPatient(ahvNumber: String): IPromise<Patient> {
    //    return this.$q((resolve) => {
    //        resolve(this.$http.get(this.urls.add));
    //    });
    //}

}
