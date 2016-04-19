import Patient from "ts/model/patient"
import Doctor from "ts/model/doctor"
import Dispense from 'ts/model/dispense'
import DrugItem from 'ts/model/drugitem'

export default class Prescription {

    constructor(
        public Patient: Patient,
        public Doctor: Doctor,
        public Type: string = null, //S=Standing, N=Normal
        public IssueDate: Date = null,
        public EditDate: Date = null,
        public IsValid: boolean = null,
        public CounterProposals: Array<any> = [], //Array<CounterProposal>;
        public ValidUntil: Date = null,
        public PrescriptionHistory: Array<Prescription> = [],
        public Drugs: Array<DrugItem> = [],
        public Dispenses?: Array<Dispense>,
        public SignDate?: Date
    ) { }

}