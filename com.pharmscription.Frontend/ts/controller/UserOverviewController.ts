import Patient from 'ts/model/patient'
import Prescription from 'ts/model/prescription'
import PatientService from 'ts/service/PatientService'
import PatientRepository from 'ts/service/PatientRepository'
import PrescriptionRepository from 'ts/service/PrescriptionRepository'
import DrugService from 'ts/service/DrugService'
import PrescriptionService from 'ts/service/PrescriptionService'

export default class UserOverviewController {
    patient: Patient;
    prescriptions: Array<Prescription> = [];

    public static $inject = [
        '$location',
        '$log',
        '$mdToast',
        'PatientService',
        'PatientRepository',
        'PrescriptionRepository',
        'DrugService',
        'PrescriptionService'
    ];
    
    constructor(
        private $location: angular.ILocationService,
        private $log: angular.ILogService,
        private $mdToast: angular.material.IToastService,
        private patientService: PatientService,
        private patientRepository: PatientRepository,
        private prescriptionRepository: PrescriptionRepository,
        private drugService: DrugService,
        private prescriptionService: PrescriptionService) {
        this.patientRepository.getPatientById(this.patientService.getPatientId()).then((foundPatient) => {
            foundPatient.BirthDate = new Date(foundPatient.BirthDate.toString());
            this.patient = foundPatient;
            this.getPrescriptions();
        }, (error) => {
            this.showToast('Patient konnte nicht geladen werden!');
            this.$log.error(error);
        });
    }

    getPrescriptions() {
        this.prescriptionRepository.getPrescriptions(this.patient.Id).then((foundPrescriptions) => {
            this.prescriptions = foundPrescriptions;
            console.log(this.prescriptions);
        }, (error) => {
            this.showToast('Rezepte konnten nicht geladen werden!');
            this.$log.error(error);
        });
    }

    showToast(message: string) {
        this.$mdToast.show(this.$mdToast.simple().textContent(message));
    }

    addPrescription() {
        this.drugService.removeAll();
        this.$location.url('prescription/create');
    }

    editUser() {
        this.$location.url('user/edit');
    }

    showPrescription(prescriptionId: string) {
        this.prescriptionService.setPatientId(this.patient.Id);
        this.prescriptionService.setPrescriptionId(prescriptionId);
        this.$location.url('prescription/view');
    }
}