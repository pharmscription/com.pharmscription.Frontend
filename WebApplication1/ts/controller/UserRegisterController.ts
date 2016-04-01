import {PatientRepository} from "../service/PatientRepository";
import Patient from '../model/patient';

export interface IUserRegisterScope extends angular.IScope{
    cantons: Object,
    canton: String,
    patient: Patient,
    savePatient: Function;
}

export class UserRegisterController {

    public static $inject = [
        '$scope',
        'PatientRepository'
    ];

    constructor($scope: IUserRegisterScope, private patientRepository: PatientRepository) {
        $scope.patient = new Patient("123");
        $scope.cantons = ('AG AR AI BL BS BE FR GE GL GR JU LU NE NW OW ' +
            'SG SH SZ SO TG TI UR VD VS ZG ZH').split(' ').map(function (canton) {
                return { abbrev: canton };
            });
        $scope.savePatient = this.savePatient;
    }

    savePatient(patient: Patient): void {
        console.log(patient.firstName);
        this.patientRepository.addPatient(patient);
    }
}