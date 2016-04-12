import Patient from 'ts/model/patient'
import Prescription from 'ts/model/prescription'

export default class UserOverviewController {
    patient: Patient;
    receipts: Array<Prescription>;
}