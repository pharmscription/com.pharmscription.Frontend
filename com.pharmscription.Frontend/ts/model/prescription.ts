import Patient from "ts/model/patient"
import Doctor from "ts/model/doctor"
import Dispense from 'ts/model/dispense'
import DrugItem from 'ts/model/drugitem'
import CounterProposal from 'ts/model/counterproposal'


export default class Prescription {

    constructor(
        public Patient: Patient = null,
        public Doctor: Doctor = null,
        public Drugs: Array<DrugItem> = [],
        public Type: string = "N", //S=Standing, N=Normal
        public IssueDate: Date = null,
        public EditDate: Date = null,
        public IsValid: boolean = null,
        public CounterProposals: Array<CounterProposal> = [], 
        public ValidUntil: Date = null,
        public PrescriptionHistory: Array<Prescription> = [],
        public Dispenses: Array<Dispense> = [],
        public Id: string = null
    ) {}

}