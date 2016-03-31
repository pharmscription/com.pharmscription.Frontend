import Patient from '../model/patient'

import HttpService = angular.IHttpService;
import IQService = angular.IQService;
import IPromise = angular.IPromise;

export default class PatientRepository {

    static $inject = [
        '$http',
        '$q'
    ];

    constructor(private $http: angular.IHttpService, private $q: angular.IQService) {
    }

    
}
