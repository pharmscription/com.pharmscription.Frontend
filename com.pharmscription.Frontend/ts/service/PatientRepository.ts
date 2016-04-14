import Patient from '../model/patient'

import IPromise = angular.IPromise;

export default class PatientRepository {

    private urls: any = {
        add: 'http://localhost:7642/RestService.svc/patients',
        insuranceLookup: 'http://localhost:7642/RestService.svc/patients/lookup/:ahvNumber',
        getPatient: 'http://localhost:7642/RestService.svc/patients/ahv-number/:ahvNumber'
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
            if (typeof response.data === 'object') {
                return response.data;
            } else {
                return this.$q.reject(response.data);
            }
        }, (error) => {
            this.$log.error(error);
            return this.$q.reject(error);
        });

    }

    getPatient(ahvNumber: string): IPromise<Patient> {
        this.$log.debug(ahvNumber);
        return this.$http.get(this.urls.getPatient.replace(':ahvNumber', ahvNumber)).then((response) => {
                if (typeof response.data === 'object') {
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

