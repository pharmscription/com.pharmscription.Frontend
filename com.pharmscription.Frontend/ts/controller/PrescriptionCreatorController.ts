import Patient from 'ts/model/patient'
import Drug from 'ts/model/drug'
import Prescription from 'ts/model/prescription'
import DrugService from 'ts/service/DrugService'
import PatientService from 'ts/service/PatientService'
import Doctor from 'ts/model/doctor'
import Address from 'ts/model/address'
import DrugItem from 'ts/model/drugitem'
import PatientRepository from 'ts/service/PatientRepository'


export default class PrescriptionCreatorController {
    patient: Patient;
    prescription: Prescription;
    prescriptionValidity: Date;
    doctor: Doctor;
    drugItems: Array<DrugItem>;

    static $inject = [
        '$location',
        'DrugService',
        'PatientService',
        'PatientRepository',
        '$mdToast',
        '$log'
    ];

    constructor(
        private $location: angular.ILocationService,
        private drugService: DrugService,
        private patientService: PatientService,
        private patientRepository: PatientRepository,
        private $mdToast: angular.material.IToastService,
        private $log: angular.ILogService) {
            this.drugItems = this.drugService.getDrugItems();
            this.patientRepository.getPatientById(this.patientService.getPatientId()).then((patient) => {
                if (patient == null) {
                    this.showToast("Patient wurde nicht gefunden");
                } else {
                    this.patient = patient;
                }
            }, (error) => {
                this.$log.error(error);
                this.showToast("Error beim holen des Patienten");
            });
           
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

    showToast(message: string) {
        this.$mdToast.show(this.$mdToast.simple().textContent(message));
    }

    addDrug(): void {
        this.drugService.saveDrugItems(this.drugItems);
        this.$location.url('prescription/drug/search');
    }

    removeDrug(index: number): void {
        this.drugService.removeDrugItem(index);
        this.drugItems = this.drugService.getDrugItems();
    }

    savePrescription(prescription: Prescription): void {
        this.prescription.Drugs = this.drugItems;
        console.log(this.prescription);
    }

    togglePrescriptionType(): void {
        if (this.prescription.Type === 'N') {
            this.prescription.Type = 'S';
        } else {
            this.prescription.Type = 'N';
        }
    }
}