export default class Address {
    constructor(
        public Street: string,
        public Number: number,
        public State: string,
        public City: string,
        public CityCode: number,
        public StreetExtension?: string
    ) { }

}