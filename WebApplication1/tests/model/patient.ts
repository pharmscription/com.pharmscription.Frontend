///<reference path="../../tools/typings/main.d.ts"/>
import Patient from "../../ts/model/patient"

describe("Patient Test", () => {
    var patient = new Patient('123');

    it("New Patient has no birthdate", () => {
        expect(patient.BirthDateStr).toBeUndefined();
    });
    it("Patient should have specified AHV-Number", () => {
        expect(patient.AhvNumber).toBe('123');
    });
    it("After birth it should have ad birthdate", () => {
        patient.birth();
        expect(patient.BirthDateStr).toBeDefined();
    });
});