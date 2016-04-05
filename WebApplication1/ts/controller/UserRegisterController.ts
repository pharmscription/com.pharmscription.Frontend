import {PatientRepository} from "../service/PatientRepository";
import {AHVNumberService} from "../service/AHVNumberService";
import Patient from '../model/patient';

export class UserRegisterController {

    cantons: Object;
    patient: Patient;

    static $inject = [
        'PatientRepository',
        'AHVNumberService',
        '$mdToast'
    ];

    constructor(private patientRepository: PatientRepository, private ahvNumberService: AHVNumberService, private $mdToast: angular.material.IToastService) {
        this.patient = new Patient(this.ahvNumberService.getAHVNumber());
        this.cantons = ('AG AR AI BL BS BE FR GE GL GR JU LU NE NW OW ' +
            'SG SH SZ SO TG TI UR VD VS ZG ZH').split(' ').map(canton => {
                return { abbrev: canton };
            });
    }

    showToast(content: string) {
        this.$mdToast.show(this.$mdToast.simple().textContent(content));
    }

    savePatient(patient: Patient): void {
        this.patientRepository.addPatient(patient).then((patientReturned) => {
            this.showToast(patientReturned.FirstName + " " + patientReturned.LastName + " gespeichert!");
        }, (error) => {
            this.showToast("Patient konnte nicht registriert werden!");
        });
        
    }
}