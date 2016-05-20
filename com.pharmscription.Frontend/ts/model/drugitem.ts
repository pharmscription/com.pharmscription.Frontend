import Drug from 'ts/model/drug'
import Dispense from 'ts/model/dispense'
import Prescription from 'ts/model/prescription'

export default class DrugItem {
    constructor(
        public Drug: Drug,
        public DosageDescription: string = null,
        public Quantity: number = null,
        public Id: string = null
    ) { }

}