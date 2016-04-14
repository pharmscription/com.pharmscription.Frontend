import PatientRepository from "../service/PatientRepository"
import AHVNumberService from "../service/AHVNumberService"
import PatientService from 'ts/service/PatientService'
import Patient from '../model/patient'

export class UserRegisterController {

    cantons: Object;
    patient: Patient;

    static $inject = [
        'PatientRepository',
        'AHVNumberService',
        'PatientService',
        '$mdToast',
        '$log'
    ];

    constructor(private patientRepository: PatientRepository, private ahvNumberService: AHVNumberService, private PatientService: PatientService, private $mdToast: angular.material.IToastService, private $log: angular.ILogService) {
        this.patient = new Patient(this.ahvNumberService.getAHVNumber());
        this.cantons = ('AG AR AI BL BS BE FR GE GL GR JU LU NE NW OW ' +
            'SG SH SZ SO TG TI UR VD VS ZG ZH').split(' ').map(canton => {
                return { abbrev: canton };
            });
    }

    showToast(message: string) {
        this.$mdToast.show(this.$mdToast.simple().textContent(message));
    }

    savePatient(patient: Patient): void {
        this.patientRepository.addPatient(patient).then((patientReturned) => {
            this.PatientService.setPatient(patientReturned);
            this.showToast(patientReturned.FirstName + " " + patientReturned.LastName + " gespeichert!");
            }, (error) => {
            this.$log.error(error);
            this.showToast("Patient konnte nicht registriert werden!");
        });
        
    }
}