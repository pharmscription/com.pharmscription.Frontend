import Prescription from 'ts/model/prescription'
import Dispense from 'ts/model/dispense'
import DrugItem from 'ts/model/drugitem'

import PrescriptionService from 'ts/service/PrescriptionService'
import PrescriptionRepository from 'ts/service/PrescriptionRepository'

export default class PrescriptionViewController {

    public prescription: Prescription;

    static $inject = [
        '$log',
        'PrescriptionService',
        'PrescriptionRepository'
    ];

    constructor(
        private $log: angular.ILogService,
        private prescriptionService: PrescriptionService,
        private prescriptionRepository: PrescriptionRepository) {
            let patientId = this.prescriptionService.getPatientId();
            let prescriptionId = this.prescriptionService.getPrescriptionId();
            this.prescriptionRepository.getPrescription(patientId, prescriptionId).then((foundPrescription) => {
                this.prescription = foundPrescription;
                this.prescription.Dispenses.push(new Dispense());
            }, (error) => {
                this.$log.error(error);
                });
       
    }

    addToDispense(drugItem: DrugItem) {
        this.$log.debug(drugItem + " hinzugefügt");
        this.$log.debug(this.prescription.Dispenses);
        this.prescription.Dispenses[this.prescription.Dispenses.length - 1].DrugItems.push(drugItem);
    }
}