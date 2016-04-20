import Drug from 'ts/model/drug'
import Dispense from 'ts/model/dispense'
import Prescription from 'ts/model/prescription'

export default class DrugItem {
    constructor(
        public Drug: Drug,
        public Amount: number,
        public DosageDescription: string
    ) { }

}