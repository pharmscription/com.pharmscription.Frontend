import Patient from "../../ts/model/patient"

describe("Patient Test", () => {
    var patient = new Patient('123');
    it("New Patient has no birthdate", () => {
        expect(patient.birthdate == null);
    });
    it("Patient should have specified AHV-Number", () => {
        expect(patient.insuranceNumber == null);
    });
    it("After birth it should have ad birthdate", () => {
        patient.birth();
        expect(patient.birthdate != null);
    });
});