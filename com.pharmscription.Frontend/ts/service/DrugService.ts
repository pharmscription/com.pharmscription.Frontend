import DrugItem from 'ts/model/drugItem'
import Prescription from 'ts/model/prescription'

export default class DrugService {
    private drugItems: Array<DrugItem>;
    private prescription: Prescription;

    constructor() {
        this.drugItems = [];
        this.prescription = new Prescription();
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

    removeAll(): void {
        this.drugItems = [];
        this.prescription = new Prescription();
    }

    savePrescriptionState(prescription: Prescription): void {
        this.prescription = prescription;
    }

    getPrescriptionState(): Prescription {
        return this.prescription;
    }


}