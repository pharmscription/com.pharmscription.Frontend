import DrugItems from 'ts/model/drugitem'
import Drugist from 'ts/model/drugist'
import DrugstoreEmployee from 'ts/model/drugstoreemployee'

export default class Dispense {

    Attribut: string;
    Date: Date;
    Remark: string;
    DrugItems: Array<DrugItems>;
    SignedBy: Drugist;
    HandedBy: DrugstoreEmployee;

    constructor() {}

}