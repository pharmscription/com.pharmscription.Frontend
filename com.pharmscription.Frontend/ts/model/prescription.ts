import Patient from "ts/model/patient"
import Doctor from "ts/model/doctor"
import Dispense from 'ts/model/dispense'
import DrugItem from 'ts/model/drugitem'

export default class Prescription {

    Type: string; //S=Standing, N=Normal
    Patient: Patient;
    IssueDate: Date;
    EditDate: Date;
    SignDate: Date;
    IsValid: boolean;
    CounterProposals: Array<any>;//Array<CounterProposal>;
    Doctor: Doctor;
    Dispenses: Array<Dispense>;
    Drugs: Array<DrugItem>;
    ValidUntill: Date;
    PrescriptionHistory: Array<Prescription>;

}