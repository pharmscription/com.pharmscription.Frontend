import DrugRepository from '../service/DrugRepository'

export default class DrugSearchItems {
    pageNumber: number;
    PAGE_SIZE: number;
    loadedPages: any;
    numItems: number;

    constructor(private drugRepository: DrugRepository, searchTerm: string) {
        this.PAGE_SIZE = 50;
        this.numItems = 0;
        this.loadedPages = {};
        this.fetchNumItems();
    }

    getItemAtIndex(index: number): Object {
        var pageNumber = Math.floor(index / this.PAGE_SIZE);
        var page = this.loadedPages[this.pageNumber];
        if (page) {
            return page[index % this.PAGE_SIZE];
        } else if (page !== null) {
            this.fetchPage(this.pageNumber);
        }
    }

    getLength(): number {
        return this.numItems;
    }

    fetchPage(pageNumber: number): void {
        this.loadedPages[pageNumber] = null;

        //drugRepository.fetchPage(searchTerm, numItems, page);

        this.loadedPages[pageNumber] = [];
        var pageOffset = pageNumber * this.PAGE_SIZE;
        for (var i = pageOffset; i < pageOffset + this.PAGE_SIZE; i++) {
            this.loadedPages[pageNumber].push(i);
        }
    }

    fetchNumItems(): void {
        //this.numItems = drugRepository.getNumItems(searchTerm);
    }
}