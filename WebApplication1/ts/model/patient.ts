import Address from "./address";
import moment from 'moment'

export default class Patient {
    FirstName: String;
    LastName: String;
    AhvNumber: String;
    Address: Address;
    BirthDateStr: Date;
    PhoneNumber: String;
    EMailAddress: String;
    InsuranceNumber: String;
    Insurance: String;

    constructor(AhvNumber: String) {
        Date.prototype.toJSON = function () { return moment.utc(this).format("L"); }
        this.AhvNumber = AhvNumber;
    }

    birth() {
        this.BirthDateStr = new Date();
    }

}