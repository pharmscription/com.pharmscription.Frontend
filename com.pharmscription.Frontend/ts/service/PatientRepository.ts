import Patient from '../model/patient'

import IPromise = angular.IPromise;

export default class PatientRepository {

    private urls: any = {
        add: 'http://localhost:7642/patients',
        insuranceLookup: 'http://localhost:7642/patients/lookup/{ahv}',
        getByAhv: 'http://localhost:7642/patients/ahv-number/{ahv}',
        getById: 'http://localhost:7642/patients/{id}',
        edit: 'http://localhost:7642/patients/{id}'
    }

    static $inject = [
        '$http',
        '$q',
        '$log'
    ];

    constructor(private $http: angular.IHttpService, private $q: angular.IQService, private $log: angular.ILogService) {
    }

    addPatient(patient: Patient): IPromise<Patient> {
        let data = JSON.stringify(patient);
        this.$log.debug(data);
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
        this.$log.debug(ahvNumber);
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
        this.$log.debug(id);
        return this.$http.get(this.urls.getById.replace('{id}', id)).then((response) => {
                this.$log.debug(id);
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
        this.$log.debug(patient.Id);
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

