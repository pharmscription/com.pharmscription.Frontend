import Drug from '../model/drug'
import IPromise = angular.IPromise

export default class DrugRepository {

    private urls: any = {
        get: 'http://localhost:7642/RestService.svc/drugs'
    }

    static $inject = [
        '$http',
        '$q'
    ];

    constructor(private $http: angular.IHttpService, private $q: angular.IQService) {
    }

    getDrugs(searchTerm: string): IPromise<Array<Drug>> {
        return this.$q((resolve) => {
            resolve(this.$http.get(this.urls.get));
        });
    }
}