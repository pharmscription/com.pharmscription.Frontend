import Patient from "ts/model/patient"

export default class PatientService {
    private patient: Patient;

    setPatient(patient: Patient) {
        this.patient = patient;
    }

    getPatient(): Patient {
        return this.patient;
    }

}