import DrugItem from 'ts/model/drugitem'
import Drugist from 'ts/model/drugist'
import DrugstoreEmployee from 'ts/model/drugstoreemployee'

export default class Dispense {

    constructor(
        public Date: Date = null,
        public Remark: string = null,
        public DrugItems: Array<DrugItem> = [],
        public SignedBy: Drugist = null,
        public HandedBy: DrugstoreEmployee = null
    ) { }

}