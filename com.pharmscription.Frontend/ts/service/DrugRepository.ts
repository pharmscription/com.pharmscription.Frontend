import Drug from '../model/drug'
import IPromise = angular.IPromise

export default class DrugRepository {

    private urls: any = {
        get: 'http://localhost:7642/RestService.svc/drugs/search/:searchTerm',
        getNumItems: 'http://localhost:7642/RestService.svc/drugs/numitems/:searchTerm',
        getPage: 'http://localhost:7642/RestService.svc/drugs/fetchpage/:searchTerm/:numItems/:page'
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

    getNumItems(searchTerm: string): IPromise<number> {
        return this.$http.get(this.urls.getNumItems.replace(":searchTerm", searchTerm)).then((response) => {
            if (typeof response.data === 'number') {
                return response.data;
            } else {
                return this.$q.reject(response.data);
            }
        }, (error) => {
            this.$log.error(error);
            return this.$q.reject(error);
        });
    }

    fetchPage(searchTerm: string, numItems: number, page: number): IPromise<Array<Drug>> {
        return this.$http.get(this.urls.getPage.replace(":searchTerm", searchTerm).replace(":numItems", numItems).replace(":page", page)).then((response) => {
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
}