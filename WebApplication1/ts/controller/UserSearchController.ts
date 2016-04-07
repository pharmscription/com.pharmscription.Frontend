import {AHVNumberService} from "../service/AHVNumberService"
import {PatientRepository} from '../service/PatientRepository'
import Patient from '../model/patient'

export class UserSearchController {
    social: string;

    static $inject = [
        '$mdDialog',
        '$location',
        'AHVNumberService',
        'PatientRepository'
    ];

    constructor(private $mdDialog: angular.material.IDialogService, private $location: angular.ILocationService, private ahvNumberService: AHVNumberService, private patientRepository: PatientRepository) {
        this.social = '';
    }

    search(event: MouseEvent): void {
        this.patientRepository.getPatient(this.social).then((successCallback: Patient) => {
            if (successCallback.data != null) {
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
            } else {
                this.$mdDialog.show(
                    this.$mdDialog.alert()
                        .title('Patient gefunden!')
                        .textContent('Patient: ' + successCallback.data.FirstName + " " + successCallback.data.LastName)
                        .targetEvent(event)
                        .ok('Danke')
                );
            }
            

        }, (errorReason) => {
            console.log('error');
        });

    };
}
