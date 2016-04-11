import DrugRepository from '../service/DrugRepository'

export default class DrugSearchItems {
    pageNumber: number;
    PAGE_SIZE: number;
    loadedPages: any;
    numItems: number;

    constructor(private drugRepository: DrugRepository, private searchTerm: string) {
        this.PAGE_SIZE = 50;
        this.numItems = 0;
        this.loadedPages = {};
        this.fetchNumItems();
    }

    getItemAtIndex(index: number): Object {
        var pageNumber = Math.floor(index / this.PAGE_SIZE);
        var page = this.loadedPages[pageNumber];
        if (page) {
            return page[index % this.PAGE_SIZE];
        } else if (page !== null) {
            this.fetchPage(pageNumber);
        }
    }

    getLength(): number {
        return this.numItems;
    }

    fetchPage(pageNumber: number): void {
        this.loadedPages[pageNumber] = null;
        console.log('fetchpage :' + this.searchTerm + " " + this.numItems + " " + pageNumber);
        this.drugRepository.fetchPage(this.searchTerm, this.numItems, pageNumber).then((drugPage) => {
            this.loadedPages[pageNumber].push(drugPage);
        }, (error) => {
            console.log("error in fetchPage");
        });
    }

    fetchNumItems(): void {
        this.drugRepository.getNumItems(this.searchTerm).then((numItems) => {
            console.log('numItems:' + numItems);
            this.numItems = numItems;
        }, (error) => {
            console.log("error fetchNumItems");
        });       
    }
}