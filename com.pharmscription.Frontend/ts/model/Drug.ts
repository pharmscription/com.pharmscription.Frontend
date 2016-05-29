export default class Drug {

    constructor(
        public DrugDescription: string,
        public PackageSize: number,
        public Unit: string,
        public Composition: string,
        public NarcoticCategory: string,
        public IsValid: boolean,
        public Id: string = null
    ) {}

}