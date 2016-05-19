import Dispense from 'ts/model/Dispense'
import IPromise = angular.IPromise

export default class DispenseRepository {

    private urls: any = {
        put: 'http://localhost:7642/patients/{patientId}/prescriptions/{prescriptionId}/dispenses',
        post: 'http://localhost:7642/patients/{patientId}/prescriptions/{prescriptionId}/dispenses/{dispenseId}'
        
    }

    static $inject = [
        '$http',
        '$q',
        '$log'
    ];

    constructor(private $http: angular.IHttpService, private $q: angular.IQService, private $log: angular.ILogService) {
    }

    addDispense(patientId: string, prescriptionId: string, dispense: Dispense): IPromise<Dispense> {
        let data = JSON.stringify(dispense);
        return this.$http.put(this.urls.put.replace('{patientId}', patientId).replace('{prescriptionId}', prescriptionId), data).then((response) => {
            if (response.status === 200) {
                return response.data;
            } else {
                return this.$q.reject(response);
            }
        }, (error) => {
            return this.$q.reject(error);
        });
    }

    editDispense(patientId: string, prescriptionId: string, dispense: Dispense): IPromise<Dispense> {
        let data = JSON.stringify(dispense);
        return this.$http.put(this.urls.post.replace('{patientId}', patientId).replace('{prescriptionId', prescriptionId).replace('{dispenseId}', dispense.Id), data).then((response) => {
            if (response.status === 200) {
                return response.data;
            } else {
                return this.$q.reject(response);
            }
        }, (error) => {
            return this.$q.reject(error);
        });
    }

}