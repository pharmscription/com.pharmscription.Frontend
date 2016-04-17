import Patient from "ts/model/patient"
import Doctor from "ts/model/doctor"
import Dispense from 'ts/model/dispense'
import Drug from 'ts/model/drug'

export default class Prescription {

    constructor(
        public Type: string, //S=Standing, N=Normal
        public Patient: Patient,
        public IssueDate: Date,
        public EditDate: Date,
        public IsValid: boolean,
        public CounterProposals: Array<any>, //Array<CounterProposal>;
        public Doctor: Doctor,
        public ValidUntill: Date,
        public PrescriptionHistory: Array<Prescription>,
        public Drugs: Array<Drug>,
        public Dispenses?: Array<Dispense>,
        public SignDate?: Date
    ) { }

}