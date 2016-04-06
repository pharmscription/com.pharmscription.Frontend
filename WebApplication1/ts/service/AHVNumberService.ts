
export class AHVNumberService {
    private social: String;

    constructor() {
        this.social = '';
    }

    setAHVNumber(social: String) {
        this.social = social;
    }

    getAHVNumber(): String {
        return this.social;
    }

}