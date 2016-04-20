export default class PrescriptionService {
    prescriptionId: string;
    patientId: string;

    setPrescriptionId(id: string) {
        this.prescriptionId = id;
    }

    getPrescriptionId() {
        return this.prescriptionId;
    }

    setPatientId(id: string) {
        this.patientId = id;
    }

    getPatientId() {
        return this.patientId;
    }
}