import Drug from '../model/drug'
import IPromise = angular.IPromise

export default class DrugRepository {

    private urls: any = {
        get: 'http://localhost:7642/RestService.svc/drugs/search/:searchTerm'
    }

    static $inject = [
        '$http',
        '$q',
        '$log'
    ];

    constructor(private $http: angular.IHttpService, private $q: angular.IQService, private $log: angular.ILogService) {
    }

    getDrugs(searchTerm: string): IPromise<Array<Drug>> {
        return this.$http.get(this.urls.get.replace(":searchTerm", searchTerm)).then((response) => {
            if (response.data === 'object') {
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