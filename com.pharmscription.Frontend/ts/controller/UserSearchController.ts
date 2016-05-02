import AHVNumberService from "../service/AHVNumberService"
import PatientRepository from '../service/PatientRepository'
import PatientService from 'ts/service/PatientService';
import Patient from '../model/patient'

export default class UserSearchController {
    social: string;

    static $inject = [
        '$mdDialog',
        '$mdToast',
        '$location',
        '$translate',
        'AHVNumberService',
        'PatientRepository',
        'PatientService',
        '$log'
    ];

    constructor(
        private $mdDialog: angular.material.IDialogService,
        private $mdToast: angular.material.IToastService,
        private $location: angular.ILocationService,
        private $translate: angular.translate.ITranslateService,
        private ahvNumberService: AHVNumberService,
        private patientRepository: PatientRepository,
        private patientService: PatientService,
        private $log: angular.ILogService
        ) {
        this.social = '';
    }

    showPatientNotFoundDialog(event: MouseEvent) {
        this.$translate(['DIALOG.PATIENT-NOT-FOUND.TITLE', 'DIALOG.PATIENT-NOT-FOUND.CONTENT', 'DIALOG.PATIENT-NOT-FOUND.OK', 'DIALOG.PATIENT-NOT-FOUND.CANCEL']).then((translations) => {
            let confirm: angular.material.IConfirmDialog = this.$mdDialog.confirm()
                .title(translations['DIALOG.PATIENT-NOT-FOUND.TITLE'])
                .textContent(translations['DIALOG.PATIENT-NOT-FOUND.CONTENT'])
                .ariaLabel(translations['DIALOG.PATIENT-NOT-FOUND.TITLE'])
                .targetEvent(event)
                .ok(translations['DIALOG.PATIENT-NOT-FOUND.OK'])
                .cancel(translations['DIALOG.PATIENT-NOT-FOUND.CANCEL']);
            this.$mdDialog.show(confirm).then(() => {
                this.ahvNumberService.setAHVNumber(this.social);
                this.$location.url('user/register');
            });
        });
    }

    showToast(message: string) {
        this.$mdToast.show(this.$mdToast.simple().textContent(message));
    }

    search(event: MouseEvent): void {
        this.patientRepository.getPatientByAhv(this.social).then((foundPatient: Patient) => {
            this.$log.debug(foundPatient);
            if (foundPatient === null) {
                this.showPatientNotFoundDialog(event);
            } else {
                this.patientService.setPatientId(foundPatient.Id);
                this.$location.url('user/overview');
            }
        }, (errorReason) => {
            this.$log.error(errorReason);
            this.$translate('TOAST.SEARCH-ERROR').then((message) => {
                this.showToast(message);
            });
        });

    };
}
