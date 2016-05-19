import Patient from 'ts/model/patient'
import Prescription from 'ts/model/prescription'
import PatientService from 'ts/service/PatientService'
import PatientRepository from 'ts/service/PatientRepository'
import PrescriptionRepository from 'ts/service/PrescriptionRepository'
import PrescriptionService from 'ts/service/PrescriptionService'

export default class UserOverviewController {
    patient: Patient;
    prescriptions: Array<Prescription> = [];
    loadingPrescriptions: boolean = true;

    public static $inject = [
        '$location',
        '$log',
        '$mdToast',
        '$translate',
        'PatientService',
        'PatientRepository',
        'PrescriptionRepository',
        'PrescriptionService'
    ];

    constructor(
        private $location: angular.ILocationService,
        private $log: angular.ILogService,
        private $mdToast: angular.material.IToastService,
        private $translate: angular.translate.ITranslateService,
        private patientService: PatientService,
        private patientRepository: PatientRepository,
        private prescriptionRepository: PrescriptionRepository,
        private prescriptionService: PrescriptionService) {
        this.patientRepository.getPatientById(this.patientService.getPatientId()).then((foundPatient) => {
            foundPatient.BirthDate = this.parseDateString(foundPatient.BirthDate.toString());
            this.patient = foundPatient;
            this.$log.debug(this.patient);
            this.getPrescriptions();
        }, (error) => {
            this.$translate('TOAST.PATIENT-LOAD-ERROR').then((message) => {
                this.showToast(message);
            });
            this.$log.error(error);
        });
    }

    getPrescriptions() {
        this.prescriptionRepository.getPrescriptions(this.patient.Id).then((foundPrescriptions) => {
            this.loadingPrescriptions = false;
            this.prescriptions = foundPrescriptions;
        }, (error) => {
            this.loadingPrescriptions = false;
            this.$translate('TOAST.PRESCRIPTION-LOAD-ERROR').then((message) => {
                this.showToast(message);
            });
            this.$log.error(error);
        });
    }

    showToast(message: string) {
        this.$mdToast.show(this.$mdToast.simple().textContent(message));
    }

    addPrescription() {
        this.prescriptionService.removeAll();
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

    parseDateString(dateString: string): Date {
        let dateParts = dateString.split('.');
        let dateObject = new Date();
        dateObject.setFullYear(parseInt(dateParts[2]));
        dateObject.setMonth(parseInt(dateParts[1]) - 1);
        dateObject.setDate(parseInt(dateParts[0]));
        return dateObject;
    }
}