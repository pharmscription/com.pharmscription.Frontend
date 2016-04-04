﻿import {AHVNumberService} from "../service/AHVNumberService";

export interface IUserSearchScope extends angular.IScope {
    social: String,
    search: Function;
}

export class UserSearchController {

    public static $inject = [
        '$scope',
        '$mdDialog',
        '$location',
        'AHVNumberService'
    ];

    constructor($scope: IUserSearchScope, $mdDialog: angular.material.IDialogService, $location: angular.ILocationService, private ahvNumberService: AHVNumberService) {
        $scope.social = null;
        $scope.search = (socialNumber: String, event: MouseEvent) => {
            var confirm: angular.material.IConfirmDialog = $mdDialog.confirm()
                .title('Patient nicht gefunden')
                .textContent('Möchten Sie den Patienten mit der AHV-Nummer ' + socialNumber + ' Registrieren?')
                .ariaLabel('Patient Registrieren')
                .targetEvent(event)
                .ok('Registrieren')
                .cancel('Abbrechen');
            $mdDialog.show(confirm).then(() => {
                this.ahvNumberService.setAHVNumber(socialNumber);
                $location.url('user/register');
            });
        };
    }
}