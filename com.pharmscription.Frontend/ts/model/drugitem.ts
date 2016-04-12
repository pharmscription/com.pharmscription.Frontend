import Drug from 'ts/model/drug'
import Dispense from 'ts/model/dispense'
import Prescription from 'ts/model/prescription'

export default class DrugItem {

    Drug: Drug;
    Dispense: Dispense;
    Prescription: Prescription;
    DosageDescription: string;

}