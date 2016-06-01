import Patient from 'ts/model/patient'
import Config from 'ts/model/config'
import IPromise = angular.IPromise;

export default class PatientRepository {

    private urls: any = {
        add: this.config.backendUrl + '/patients',
        insuranceLookup: this.config.backendUrl + '/patients/lookup/{ahv}/',
        getByAhv: this.config.backendUrl + '/patients/ahv-number/{ahv}/',
        getById: this.config.backendUrl + '/patients/{id}',
        edit: this.config.backendUrl + '/patients/{id}'
    }

    static $inject = [
        'config',
        '$http',
        '$q',
        '$log'
    ];

    constructor(
        private config: Config,
        private $http: angular.IHttpService,
        private $q: angular.IQService,
        private $log: angular.ILogService) {
    }

    addPatient(patient: Patient): IPromise<Patient> {
        let data = JSON.stringify(patient);
        return this.$http.put(this.urls.add, data).then((response) => {
            if (response.status === 200) {
                return response.data;
            } else {
                return this.$q.reject(response.data);
            }
        }, (error) => {
            this.$log.error(error);
            return this.$q.reject(error);
        });

    }

    getPatientByAhv(ahvNumber: string): IPromise<Patient> {
        return this.$http.get(this.urls.getByAhv.replace('{ahv}', ahvNumber)).then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else if (response.status === 204) {
                    return null;
                } else {
                    return this.$q.reject(response.data);
                }
        }, (error) => {
                this.$log.error(error);
                return this.$q.reject(error);
            }
        );
    }

    getPatientById(id: string): IPromise<Patient> {
        if (id === null)
            return this.$q.reject("No ID Submitted");
        return this.$http.get(this.urls.getById.replace('{id}', id)).then((response) => {
            if (response.status === 200) {
                return response.data;
            } else {
                return this.$q.reject(response.data);
            }
        }, (error) => {
            this.$log.error(error);
            return this.$q.reject(error);
        }
        );
    }

    editPatient(patient: Patient): IPromise<Patient> {
        if (patient.Id === null || patient.Id === undefined) {
            return this.$q.reject('Patient hat keine ID');
        }
        let data = JSON.stringify(patient);
        return this.$http.post(this.urls.edit.replace('{id}', patient.Id), data).then((response) => {
            if (response.status === 200) {
                return response.data;
            } else {
                return this.$q.reject(response.data);
            }
        }, (error) => {
            this.$log.error(error);
            return this.$q.reject(error);
            }
        );
    }

}

