///<reference path="../../tools/typings/main.d.ts"/>
import {AHVNumberService} from "ts/service/AHVNumberService"

describe("AHVNumberService Test", () => {
    var ahvNumberService:AHVNumberService = new AHVNumberService;

    it("is correctly defined", () => {
        expect(ahvNumberService).not.toBeUndefined();
        expect(ahvNumberService).not.toBeNull();
    });
    it("has a default value if no value has been set", () => {
        expect(ahvNumberService.getAHVNumber()).toBe('');
    });
    it("correctly sets a value", () => {
        ahvNumberService.setAHVNumber("111.1111.1111.11");
        expect(ahvNumberService.getAHVNumber()).toBe("111.1111.1111.11");
    });
});