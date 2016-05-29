import DrugRepository from 'ts/service/DrugRepository'

export default class DrugSearchItems {
    pageNumber: number;
    PAGE_SIZE: number;
    loadedPages: any;
    numItems: number;
    
    constructor(
        private $mdToast: angular.material.IToastService,
        private $q: angular.IQService,
        private $scope: ng.IScope,
        private drugRepository: DrugRepository,
        private searchTerm: string,
        private callback?: Function,
        private $translate?: angular.translate.ITranslateService) {
            this.PAGE_SIZE = 50;
            this.loadedPages = {};
            this.numItems = 0;
            this.fetchNumItems();
       }

    getItemAtIndex(index: number): Object {
        let pageNumber = Math.floor(index / this.PAGE_SIZE);
        let page = this.loadedPages[pageNumber];
        if (page) {
            let pageIndex = index % this.PAGE_SIZE;
            return page[pageIndex];
        } else if (page !== null) {
            this.fetchPage(pageNumber);
        }
    }

    getLength(): number {
        return this.numItems;
    }

    fetchPage(pageNumber: number): void {
        this.loadedPages[pageNumber] = null;
        console.debug("SearchTerm: " + this.searchTerm + " PageSize: " + this.PAGE_SIZE + " Page: " + pageNumber);
        this.drugRepository.fetchPage(this.searchTerm, this.PAGE_SIZE, pageNumber).then((drugPageResult) => {
            this.loadedPages[pageNumber] = [];
            this.loadedPages[pageNumber] = drugPageResult;
        }, (error) => {
                this.$translate('TOAST.DRUGS-LOAD-ERROR').then((message) => {
                    this.showToast(message);
                });
            }
        );
    }

    fetchNumItems(): void {
        this.drugRepository.getNumItems(this.searchTerm).then((numItem) => {
            this.numItems = numItem;
            this.callback();
        }, (error) => {
        });
    }

    showToast(message: string): void {
        this.$mdToast.show(this.$mdToast.simple().textContent(message));
    }

}