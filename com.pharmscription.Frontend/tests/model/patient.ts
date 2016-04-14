///<reference path="../../tools/typings/main.d.ts"/>
import Patient from "../../ts/model/patient"
import Address from '../../ts/model/address'

describe("Patient Test", () => {
    var patient = new Patient(
        '123',
        'Max',
        'Muster',
        new Address('Bahnhostrasse', 666, 'ZH', 'Zürich', 8888),
        new Date(),
        '0980980980', 'max@muster.com',
        'xx-xx-xx',
        'Sanitas',
        '666');

    it("Patient should have specified AHV-Number", () => {
        expect(patient.AhvNumber).toBe('123');
    });
});