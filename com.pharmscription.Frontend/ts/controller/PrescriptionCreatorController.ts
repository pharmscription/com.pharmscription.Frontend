import Patient from 'ts/model/patient'
import Drug from 'ts/model/drug'
import Prescription from 'ts/model/prescription'
import DrugService from 'ts/service/DrugService'
import PatientService from 'ts/service/PatientService'
import Doctor from 'ts/model/doctor'
import Address from 'ts/model/address'
import DrugItem from 'ts/model/drugitem'

export default class PrescriptionCreatorController {
    patient: Patient;
    prescription: Prescription;
    drugs: Array<Drug>;
    prescriptionValidity: Date;
    doctor: Doctor;
    drugItems: Array<DrugItem>;

    static $inject = [
        '$location',
        'DrugService',
        'PatientService'
    ];

    constructor(private $location: angular.ILocationService, private drugService: DrugService, private patientService: PatientService) {
        this.drugs = this.drugService.getDrugs();
        this.convertDrugsIntoDrugItems();
        this.patient = patientService.getPatient();
        this.doctor = new Doctor(
            '1234.123.123.12',
            'Hippo',
            'Krates',
            new Address(
                'Greekstr.',
                99,
                'AT',
                'Athen',
                4253
            ), '643.234.534',
            '0980980980',
            '1231231231'
        );
        this.prescription = new Prescription(this.patient, this.doctor);
    }

    convertDrugsIntoDrugItems(): void {
        this.drugItems = this.drugs.map((drug: Drug) => {
            return new DrugItem(drug);
        });
        console.log(this.drugItems);
    }

    addDrug(): void {
        this.$location.url('prescription/drug/search');
    }

    removeDrug(index: number): void {
        this.drugService.removeDrug(index);
        this.drugs = this.drugService.getDrugs();
        this.convertDrugsIntoDrugItems();
    }

    savePrescription(prescription: Prescription): void {
        this.prescription.Drugs = this.drugItems;
        console.log(this.prescription);
    }
}