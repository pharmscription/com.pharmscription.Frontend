import Patient from 'ts/model/patient'
import Drug from 'ts/model/drug'
import Prescription from 'ts/model/prescription'

export default class PrescriptionCreatorController {
    patient: Patient;
    prescription: Prescription;
    drugs: Array<Drug>;
}