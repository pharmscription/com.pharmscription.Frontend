import Patient from 'ts/model/patient'
import Drug from 'ts/model/drug'
import Prescription from 'ts/model/prescription'
import DrugService from 'ts/service/DrugService'
import PatientService from 'ts/service/PatientService'
import Doctor from 'ts/model/doctor'
import Address from 'ts/model/address'
import DrugItem from 'ts/model/drugitem'
import PatientRepository from 'ts/service/PatientRepository'
import PrescriptionRepository from 'ts/service/PrescriptionRepository'


export default class PrescriptionCreatorController {
    patient: Patient;
    prescription: Prescription;
    doctor: Doctor;
    drugItems: Array<DrugItem>;
    isRepeatPrescription: boolean;


    static $inject = [
        '$scope',
        '$location',
        'DrugService',
        'PatientService',
        'PatientRepository',
        '$mdToast',
        '$log',
        'PrescriptionRepository'
    ];

    constructor(
        private $scope: angular.IScope,
        private $location: angular.ILocationService,
        private drugService: DrugService,
        private patientService: PatientService,
        private patientRepository: PatientRepository,
        private $mdToast: angular.material.IToastService,
        private $log: angular.ILogService,
        private prescriptionRepository: PrescriptionRepository) {
            this.drugItems = this.drugService.getDrugItems();
            this.prescription = this.drugService.getPrescriptionState();
            this.isRepeatPrescription = this.isRepeatPrescriptionType();
            this.patientRepository.getPatientById(this.patientService.getPatientId()).then((patient) => {
                if (patient == null) {
                    this.showToast("Patient wurde nicht gefunden");
                } else {
                    this.patient = patient;
                    // Mock
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
                }
            }, (error) => {
                this.$log.error(error);
                this.showToast("Error beim holen des Patienten");
            });
    }

    showToast(message: string) {
        this.$mdToast.show(this.$mdToast.simple().textContent(message));
    }

    addDrug(): void {
        this.drugService.savePrescriptionState(this.prescription);
        this.$location.url('prescription/drug/search');
    }

    removeDrug(index: number): void {
        this.drugService.removeDrugItem(index);
        this.drugItems = this.drugService.getDrugItems();
    }

    savePrescription(): void {
        this.prescription.IssueDate = new Date();
        this.prescription.Patient = this.patient;
        this.prescription.Doctor = this.doctor;
        this.prescription.Drugs = this.drugItems;
        this.prescriptionRepository.newPrescription(this.prescription).then((prescription) => {
            this.$log.debug(prescription.Id);
            this.showToast("Rezept wurde gespeichert");
            this.$location.url('user/overview');
        }, (error) => {
            this.$log.error(error);
            this.showToast("Error beim Speichern des Rezepts");
        });
    }

    togglePrescriptionType(): void {
        if (this.prescription.Type === 'N') {
            this.prescription.Type = 'S';
        } else {
            this.prescription.Type = 'N';
        }
    }

    isRepeatPrescriptionType(): boolean {
        return this.prescription.Type === 'S';
    }
}