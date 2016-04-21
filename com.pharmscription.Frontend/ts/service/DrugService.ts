import DrugItem from 'ts/model/drugItem'

export default class DrugService {
    private drugItems: Array<DrugItem>;

    constructor() {
        this.drugItems = [];
    }

    setDrugItem(drug: DrugItem) {
        this.drugItems.push(drug);
    }

    getDrugItems(): Array<DrugItem> {
        return this.drugItems;
    }

    removeDrugItem(index: number): void {
        this.drugItems.splice(index, 1);
    }

    removeDrugItems(): void {
        this.drugItems = [];
    }

    saveDrugItems(drugItems: Array<DrugItem>): void {
        this.drugItems = drugItems;
    }


}