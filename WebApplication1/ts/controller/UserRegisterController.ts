import {PatientRepository} from "../service/PatientRepository";
import Patient from '../model/patient';

export class UserRegisterController {

    cantons: Object;

    static $inject = [
        'PatientRepository'
    ];

    constructor(private patientRepository: PatientRepository) {
        this.cantons = ('AG AR AI BL BS BE FR GE GL GR JU LU NE NW OW ' +
            'SG SH SZ SO TG TI UR VD VS ZG ZH').split(' ').map(canton => {
            return { abbrev: canton };
        });
    }

    savePatient(patient: Patient): void {
        alert('clicked');
        this.patientRepository.addPatient(patient);
    }
}