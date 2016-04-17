import Drug from 'ts/model/drug'
import Drugist from 'ts/model/drugist'
import DrugstoreEmployee from 'ts/model/drugstoreemployee'

export default class Dispense {

    Attribut: string;
    Date: Date;
    Remark: string;
    DrugItems: Array<Drug>;
    SignedBy: Drugist;
    HandedBy: DrugstoreEmployee;

    constructor() {}

}