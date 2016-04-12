import DrugItem from 'ts/model/drugitem'
import Drugist from 'ts/model/drugist'
import DrugstoreEmployee from 'ts/model/drugstoreemployee'

export default class Dispense {

    Attribut: string;
    Date: Date;
    Remark: string;
    DrugItems: Array<DrugItem>;
    SignedBy: Drugist;
    HandedBy: DrugstoreEmployee;

}