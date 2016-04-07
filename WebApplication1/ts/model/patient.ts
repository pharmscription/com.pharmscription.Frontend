import Address from "./address";
import moment from 'moment'

export default class Patient {
    FirstName: string;
    LastName: string;
    AhvNumber: string;
    Address: Address;
    BirthDateStr: Date;
    PhoneNumber: string;
    EMailAddress: string;
    InsuranceNumber: string;
    Insurance: string;

    constructor(AhvNumber: string) {
        Date.prototype.toJSON = function () { return moment(this).format("L"); }
        this.AhvNumber = AhvNumber;
    }

    birth() {
        this.BirthDateStr = new Date();
    }

}