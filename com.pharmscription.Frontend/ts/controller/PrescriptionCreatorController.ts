import Patient from 'ts/model/patient'
import Drug from 'ts/model/drug'
import Prescription from 'ts/model/prescription'
import DrugService from 'ts/service/DrugService'

export default class PrescriptionCreatorController {
    patient: Patient;
    prescription: Prescription;
    drugs: Array<Drug>;

    static $inject = [
        '$location',
        'DrugService'
    ];

    constructor(private $location: angular.ILocationService, private drugService: DrugService) {
        this.drugs = this.drugService.getDrugs();
    }

    addDrug(): void {
        this.$location.url('prescription/drug/search');
    }

    removeDrug(index: Number): void {
        this.drugService.removeDrug(index);
        this.drugs = this.drugService.getDrugs();
    }
}