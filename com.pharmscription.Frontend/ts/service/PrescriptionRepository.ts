import Prescription from 'ts/model/prescription'

import IPromise = angular.IPromise;

export default class PrescriptionRepository {
    private urls: any = {
        getPrescriptions: 'http://localhost:7642/RestService.svc/patients/{id}/prescriptions',
        getPrescription: 'http://localhost:7642/RestService.svc/patients/{patientId}/prescriptions/{prescriptionId}',
        newPrescription: 'http://localhost:7642/RestService.svc/patients/{id}/prescriptions'
    }

    static $inject = [
        '$http',
        '$q',
        '$log'
    ];

    constructor(
        private $http: angular.IHttpService,
        private $q: angular.IQService,
        private $log: angular.ILogService) {
    }

    getPrescriptions(patientId: string): IPromise<Array<Prescription>> {
        return this.$http.get(this.urls.getPrescriptions.replace('{id}', patientId)).then((response) => {
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

    getPrescription(patientId: string, prescriptionId: string): IPromise<Prescription> {
       return this.$http.get(this.urls.getPrescription.replace('{patientId}', patientId).replace('{prescriptionId}', prescriptionId)).then((response) => {
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

    newPrescription(prescription: Prescription): IPromise<Prescription> {
        return this.$http.put(this.urls.newPrescription.replace('{patientId}', prescription.Patient.Id),prescription).then((response) => {
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
}