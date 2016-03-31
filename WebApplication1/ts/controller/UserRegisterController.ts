import {PatientRepository} from "../service/PatientRepository";
import Patient from '../model/patient';

export interface IUserRegisterScope extends angular.IScope{
    cantons: Object,
    canton: String,
    savePatient: Function;
}

export class UserRegisterController {

    public static $inject = [
        '$scope',
        'PatientRepository'
    ];

    constructor($scope: IUserRegisterScope, private patientRepository: PatientRepository) {
        $scope.cantons = ('AG AR AI BL BS BE FR GE GL GR JU LU NE NW OW ' +
            'SG SH SZ SO TG TI UR VD VS ZG ZH').split(' ').map(function (canton) {
                return { abbrev: canton };
            });
    }

    savePatient(patient: Patient): void {
        this.patientRepository.addPatient(patient);
    }
}