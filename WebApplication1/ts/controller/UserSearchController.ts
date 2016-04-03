export class UserSearchController {
    social: String;

    static $inject = [
        '$mdDialog',
        '$location'
    ];

    constructor(private $mdDialog: angular.material.IDialogService, private $location: angular.ILocationService) {
        this.social = null;
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
            this.$location.url('user/register');
        });
    };
}