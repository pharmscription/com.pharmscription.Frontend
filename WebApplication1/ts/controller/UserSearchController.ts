import {AHVNumberService} from "../service/AHVNumberService";

export interface IUserSearchScope extends angular.IScope {
    social: String,
    search: Function;
}

export class UserSearchController {
    social: String;

    static $inject = [
        '$mdDialog',
        '$location',
        'AHVNumberService'
    ];

    constructor(private $mdDialog: angular.material.IDialogService, private $location: angular.ILocationService, private ahvNumberService: AHVNumberService) {
        this.social = '';
    }

    search(socialNumber: String, event: MouseEvent): void {
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
        };
    }
