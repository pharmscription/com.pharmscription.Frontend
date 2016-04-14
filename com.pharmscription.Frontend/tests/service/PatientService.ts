///<reference path="../../tools/typings/main.d.ts"/>
import PatientService from "../../ts/service/PatientService"
import Patient from '../../ts/model/patient'

describe("PatientService Test", () => {
    var patientService:PatientService = new PatientService;

    it("is correctly defined", () => {
        expect(patientService).not.toBeUndefined();
        expect(patientService).not.toBeNull();
    });

    it("has a default value if no value has been set", () => {
        expect(patientService.getPatient()).toBeUndefined();
    });
    
    it("correctly sets a value", () => {
        patientService.setPatient(new Patient('111.1111.1111.11'));
        expect(patientService.getPatient().AhvNumber).toBe("111.1111.1111.11");
    });
});