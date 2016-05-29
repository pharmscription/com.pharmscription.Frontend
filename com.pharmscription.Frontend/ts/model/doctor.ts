import Address from 'ts/model/address'

export default class Doctor {

    constructor(
        public AHVNumber: string,
        public FirstName: string,
        public LastName: string,
        public Address: Address,
        public ZSRNumber: string,
        public PhoneNumber: string,
        public FaxNumber: string
    ) {}

}