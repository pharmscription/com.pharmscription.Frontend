import {PatientRepository} from "../service/PatientRepository";
import {AHVNumberService} from "../service/AHVNumberService";
import Patient from '../model/patient';

export class UserRegisterController {

    cantons: Object;
    patient: Patient;

    static $inject = [
        'PatientRepository',
        'AHVNumberService'
    ];

    constructor(private patientRepository: PatientRepository, private ahvNumberService: AHVNumberService) {
        this.patient = new Patient(this.ahvNumberService.getAHVNumber());
        this.cantons = ('AG AR AI BL BS BE FR GE GL GR JU LU NE NW OW ' +
            'SG SH SZ SO TG TI UR VD VS ZG ZH').split(' ').map(canton => {
                return { abbrev: canton };
            });
    }

    savePatient(patient: Patient): void {
        console.log(patient.firstName);
        this.patientRepository.addPatient(patient);
    }
}