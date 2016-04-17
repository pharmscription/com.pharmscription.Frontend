import Drug from 'ts/model/drug'
import Dispense from 'ts/model/dispense'
import Prescription from 'ts/model/prescription'

export default class DrugItem {
    constructor(
        private Drug: Drug,
        private Dispense: Dispense,
        private Prescription: Prescription,
        private DosageDescription: string
    ) { }

}