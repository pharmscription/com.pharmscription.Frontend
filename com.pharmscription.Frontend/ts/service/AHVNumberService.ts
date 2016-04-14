export default class AHVNumberService {
    private social: string;

    constructor() {
        this.social = '';
    }

    setAHVNumber(social: string) {
        this.social = social;
    }

    getAHVNumber(): string {
        return this.social;
    }

}