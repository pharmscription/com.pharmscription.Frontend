import {PatientRepository} from "../service/PatientRepository";
import {AHVNumberService} from "../service/AHVNumberService";
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
        'PatientRepository',
        'AHVNumberService'
    ];

    constructor($scope: IUserRegisterScope, private patientRepository: PatientRepository, private ahvNumberService: AHVNumberService) {
        $scope.patient = new Patient(this.ahvNumberService.getAHVNumber());
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