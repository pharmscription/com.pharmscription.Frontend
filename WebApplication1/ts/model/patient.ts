import Address from "./address";

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
        this.AhvNumber = AhvNumber;
    }

    birth() {
        this.BirthDateStr = new Date();
    }

}