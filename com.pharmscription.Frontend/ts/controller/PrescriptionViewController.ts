import Prescription from 'ts/model/prescription'

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
            }, (error) => {
                this.$log.error(error);
            });
        }

}