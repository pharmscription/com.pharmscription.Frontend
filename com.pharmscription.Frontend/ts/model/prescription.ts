import Patient from "ts/model/patient"
import Doctor from "ts/model/doctor"
import Dispense from 'ts/model/dispense'
import DrugItem from 'ts/model/drugitem'

export default class Prescription {

    constructor(
        public Patient: Patient,
        public Doctor: Doctor,
        public Type: string, //S=Standing, N=Normal
        public IssueDate: Date,
        public EditDate: Date,
        public IsValid: boolean,
        public CounterProposals: Array<any>, //Array<CounterProposal>;
        public ValidUntil: Date,
        public PrescriptionHistory: Array<Prescription>,
        public Drugs: Array<DrugItem>,
        public Id?: string,
        public Dispenses?: Array<Dispense>,
        public SignDate?: Date
    ) { }

}