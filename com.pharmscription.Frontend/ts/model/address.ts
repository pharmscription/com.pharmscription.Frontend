export default class Address {
    constructor(
        public Street: string,
        public Number: string,
        public State: string,
        public Location: string,
        public CityCode: string,
        public StreetExtension?: string
    ) { }

}