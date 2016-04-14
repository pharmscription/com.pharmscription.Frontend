import Drug from 'ts/model/drug'

export default class DrugService {
    private drugs: Array<Drug>;

    constructor() {
        this.drugs = [];
    }

    setDrug(drug: Drug) {
        this.drugs.push(drug);
    }

    getDrugs(): Array<Drug> {
        return this.drugs;
    }

}