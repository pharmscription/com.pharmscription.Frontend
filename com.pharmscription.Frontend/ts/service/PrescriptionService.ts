import DrugItem from 'ts/model/drugItem'
import Prescription from 'ts/model/prescription'

export default class PrescriptionService {
    private prescriptionId: string;
    private patientId: string;
    private drugItems: Array<DrugItem>;
    private prescription: Prescription;

    constructor() {
        this.drugItems = [];
        this.prescription = new Prescription();
    }

    setPrescriptionId(id: string): void {
        this.prescriptionId = id;
    }

    getPrescriptionId(): string {
        return this.prescriptionId;
    }

    setPatientId(id: string): void {
        this.patientId = id;
    }

    getPatientId(): string {
        return this.patientId;
    }

    setDrugItem(drug: DrugItem): void {
        this.drugItems.push(drug);
    }

    setDrugItems(drugs: Array<DrugItem>): void {
        this.drugItems = drugs;
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
