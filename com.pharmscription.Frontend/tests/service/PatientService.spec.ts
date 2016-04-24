import PatientService from "ts/service/PatientService"
import Patient from 'ts/model/patient'

describe("PatientService Test", () => {
    var patientService:PatientService = new PatientService;

    it("is correctly defined", () => {
        expect(patientService).not.toBeNull();
    });

    it("has a default value if no value has been set", () => {
        expect(patientService.getPatientId()).toBeNull();
    });
    
    it("correctly sets a value", () => {
        patientService.setPatientId('1234');
        expect(patientService.getPatientId()).toBe("1234");
    });
});