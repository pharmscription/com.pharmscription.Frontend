import Patient from 'ts/model/patient'
import Drug from 'ts/model/drug'
import Prescription from 'ts/model/prescription'
import DrugService from 'ts/service/DrugService'
import PatientService from 'ts/service/PatientService'

export default class PrescriptionCreatorController {
    patient: Patient;
    prescription: Prescription;
    drugs: Array<Drug>;
    prescriptionValidity: Date;

    static $inject = [
        '$location',
        'DrugService',
        'PatientService'
    ];

    constructor(private $location: angular.ILocationService, private drugService: DrugService, private patientService: PatientService) {
        this.drugs = this.drugService.getDrugs();
        this.patient = patientService.getPatient();
    }

    addDrug(): void {
        this.$location.url('prescription/drug/search');
    }

    removeDrug(index: number): void {
        this.drugService.removeDrug(index);
        this.drugs = this.drugService.getDrugs();
    }

    savePrescription(prescription: Prescription): void {
        prescription.Patient = this.patient;
    }
}