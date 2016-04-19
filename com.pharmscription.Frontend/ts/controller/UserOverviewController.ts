import Patient from 'ts/model/patient'
import Prescription from 'ts/model/prescription'
import PatientService from 'ts/service/PatientService'
import PrescriptionRepository from 'ts/service/PrescriptionRepository'
import DrugService from 'ts/service/DrugService'

export default class UserOverviewController {
    patient: Patient;
    prescriptions: Array<Prescription> = [];

    public static $inject = [
        '$location',
        '$mdToast',
        'PatientService',
        'PrescriptionRepository',
        'DrugService'
    ];
    
    constructor(
        private $location: angular.ILocationService,
        private $mdToast: angular.material.IToastService,
        private patientService: PatientService,
        private prescriptionRepository: PrescriptionRepository,
        private drugService: DrugService) {
        this.patient = this.patientService.getPatient();
        if (this.patient === null) {
            this.showToast('Patient konnte nicht geladen werden!');
        } else {
            this.prescriptionRepository.getPrescriptions(this.patient.Id).then((foundPrescriptions) => {
                this.prescriptions = foundPrescriptions;
            }, (error) => {
                this.showToast('Rezepte konnten nicht geladen werden!');
            });
        }
    }

    showToast(message: string) {
        this.$mdToast.show(this.$mdToast.simple().textContent(message));
    }

    addPrescription() {
        this.drugService.removeDrugs();
        this.$location.url('prescription/create');
    }

    editUser() {
        this.$location.url('user/edit');
    }
}