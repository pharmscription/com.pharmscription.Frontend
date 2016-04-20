import DrugItem from 'ts/model/drugitem'
import Drugist from 'ts/model/drugist'
import DrugstoreEmployee from 'ts/model/drugstoreemployee'

export default class Dispense {

    Attribut: string = null;
    Date: Date = null;
    Remark: string = null;
    DrugItems: Array<DrugItem> = [];
    SignedBy: Drugist = null;
    HandedBy: DrugstoreEmployee = null;

    constructor() {}

}