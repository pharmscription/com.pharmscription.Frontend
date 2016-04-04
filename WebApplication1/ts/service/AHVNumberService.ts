
export class AHVNumberService {
    private social: String;

    constructor() {
        this.social = '';
    }

    setAHVNumber(social: String) {
        console.log(social);
        this.social = social;
    }

    getAHVNumber(): String {
        return this.social;
    }

}