import Address from "./address";
import moment from 'moment'

export default class Patient {
    constructor(
        public AhvNumber: string,
        public FirstName: string,
        public LastName: string,
        public Address: Address,
        public BirthDateStr: Date,
        public PhoneNumber: string,
        public EMailAddress: string,
        public InsuranceNumber: string,
        public Insurance: string,
        public Id?: string
        ) {
        Date.prototype.toJSON = function () { return moment(this).format("L"); }
       }

    birth() {
        this.BirthDateStr = new Date();
    }

}