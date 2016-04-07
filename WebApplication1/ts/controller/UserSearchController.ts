import {AHVNumberService} from "../service/AHVNumberService"
import {PatientRepository} from '../service/PatientRepository'
import Patient from '../model/patient'

export class UserSearchController {
    social: string;

    static $inject = [
        '$mdDialog',
        '$mdToast',
        '$location',
        'AHVNumberService',
        'PatientRepository',
        '$log'
    ];

    constructor(private $mdDialog: angular.material.IDialogService, private $mdToast: angular.material.IToastService, private $location: angular.ILocationService, private ahvNumberService: AHVNumberService, private patientRepository: PatientRepository, private $log: angular.ILogService) {
        this.social = '';
    }

    showPatientNotFoundDialog(event: MouseEvent) {
        let confirm: angular.material.IConfirmDialog = this.$mdDialog.confirm()
            .title('Patient nicht gefunden')
            .textContent('Möchten Sie den Patienten mit der AHV-Nummer ' + this.social + ' Registrieren?')
            .ariaLabel('Patient Registrieren')
            .targetEvent(event)
            .ok('Registrieren')
            .cancel('Abbrechen');
        this.$mdDialog.show(confirm).then(() => {
            this.ahvNumberService.setAHVNumber(this.social);
            this.$location.url('user/register');
        });
    }

    showPatientFoundDialog(firstName: string, lastName: string, event: MouseEvent) {
        this.$mdDialog.show(
            this.$mdDialog.alert()
                .title('Patient gefunden!')
                .textContent('Patient: ' + firstName + " " + lastName)
                .targetEvent(event)
                .ok('Danke')
        );
    }

    showToast(message: string) {
        this.$mdToast.show(this.$mdToast.simple().textContent(message));
    }

    search(event: MouseEvent): void {
        this.patientRepository.getPatient(this.social).then((foundPatient: Patient) => {
            if (foundPatient.FirstName === null || foundPatient.FirstName === undefined) {
                this.showPatientNotFoundDialog(event);
            } else {
                this.showPatientFoundDialog(foundPatient.FirstName, foundPatient.LastName, event);
            }
        }, (errorReason) => {
            this.$log.error(errorReason);
            this.showToast('Fehler bei der Suche!');
        });

    };
}
