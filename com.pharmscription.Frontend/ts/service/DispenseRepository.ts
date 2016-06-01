import Dispense from 'ts/model/Dispense'
import Config from 'ts/model/config'
import IPromise = angular.IPromise

export default class DispenseRepository {

    private urls: any = {
        put: this.config.backendUrl + '/patients/{patientId}/prescriptions/{prescriptionId}/dispenses',
        post: this.config.backendUrl + '/patients/{patientId}/prescriptions/{prescriptionId}/dispenses/{dispenseId}'
        
    }

    static $inject = [
        'config',
        '$http',
        '$q',
        '$log'
    ];

    constructor(private config: Config, private $http: angular.IHttpService, private $q: angular.IQService, private $log: angular.ILogService) {
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
        return this.$http.post(this.urls.post.replace('{patientId}', patientId).replace('{prescriptionId}', prescriptionId).replace('{dispenseId}', dispense.Id), data).then((response) => {
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