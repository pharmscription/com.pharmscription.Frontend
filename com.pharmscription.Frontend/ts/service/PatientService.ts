import Patient from "ts/model/patient"

export default class PatientService {
    private patientId: string;

    setPatientId(id: string) {
        this.patientId = id;
    }

    getPatientId(): string {
        if (this.patientId === undefined) {
            return null;
        }
        return this.patientId;
    }

}