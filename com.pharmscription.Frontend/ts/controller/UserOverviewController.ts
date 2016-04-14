import Patient from 'ts/model/patient'
import Prescription from 'ts/model/prescription'
import PatientService from 'ts/service/PatientService'
import PrescriptionRepository from 'ts/service/PrescriptionRepository'

export default class UserOverviewController {
    patient: Patient;
    prescriptions: Array<Prescription>;

    public static $inject = [
        'PatientService',
        'PrescriptionRepository'
    ];
    
    constructor(private patientService: PatientService, private prescriptionRepository: PrescriptionRepository) {
        this.patient = this.patientService.getPatient();
        //this.prescriptions = this.
    }
}