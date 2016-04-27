import Address from "./address";
import moment from 'moment'

export default class Patient {
    constructor(
        public AhvNumber: string,
        public FirstName: string = null,
        public LastName: string = null,
        public Address: Address = null,
        public BirthDate: Date = null,
        public PhoneNumber: string = null,
        public EMailAddress: string = null,
        public InsuranceNumber: string = null,
        public Insurance: string = null,
        public Id?: string
        ) {
        Date.prototype.toJSON = function () { return moment(this).format("L"); }
    }
    
    birth() {
        this.BirthDate = new Date();
    }

}