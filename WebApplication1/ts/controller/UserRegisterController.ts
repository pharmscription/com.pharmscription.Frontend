import {PatientRepository} from "../service/PatientRepository";
import Patient from '../model/patient';

export interface IUserRegisterScope extends angular.IScope{
    hello: String,
    states: Object,
    kanton: String;
}

export class UserRegisterController {

    public static $inject = [
        '$scope',
        'PatientRepository'
    ];

    constructor($scope: IUserRegisterScope, private patientRepository: PatientRepository) {
        $scope.hello = 'salüü';
        $scope.states = ('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS ' +
            'MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI ' +
            'WY').split(' ').map(function (state) {
                return { abbrev: state };
            })
    }

    savePatient(patient: Patient): void {
        this.patientRepository.addPatient(patient);
    }
}