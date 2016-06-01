import Drug from 'ts/model/drug'
import Config from 'ts/model/config'
import IPromise = angular.IPromise

export default class DrugRepository {

    private urls: any = {
        get: this.config.backendUrl + '/drugs/search/{keyword}',
        getNumItems: this.config.backendUrl + '/drugs/search/count/{keyword}',
        getPage: this.config.backendUrl + '/drugs/search/{keyword}/{page}/{amount}'
    }

    static $inject = [
        'config',
        '$http',
        '$q',
        '$log'
    ];

    constructor(private config: Config, private $http: angular.IHttpService, private $q: angular.IQService, private $log: angular.ILogService) {
    }

    getDrugs(searchTerm: string): IPromise<Array<Drug>> {
        return this.$http.get(this.urls.get.replace("{keyword}", searchTerm)).then((response) => {
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

    getNumItems(searchTerm: string): IPromise<number> {
        return this.$http.get(this.urls.getNumItems.replace("{keyword}", searchTerm)).then((response) => {
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

    fetchPage(searchTerm: string, numItems: number, page: number): IPromise<Array<Drug>> {
        return this.$http.get(this.urls.getPage.replace("{keyword}", searchTerm).replace("{amount}", numItems).replace("{page}", page)).then((response) => {
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