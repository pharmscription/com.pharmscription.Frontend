import Address from "./address";

export default class Patient {
    firstName: String;
    lastName: String;
    address: Address;
    birthdate: Date;
    phoneNumber: String;
    emailAddress: String;
    insuranceNumber: String;
    insurance: String;

    constructor(insuranceNumber: String) {
        this.insuranceNumber = insuranceNumber;
    }

    birth() {
        this.birthdate = new Date();
    }

}