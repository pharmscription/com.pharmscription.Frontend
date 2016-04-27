import Prescription from 'ts/model/prescription'
import Dispense from 'ts/model/dispense'
import DrugItem from 'ts/model/drugitem'

import PrescriptionService from 'ts/service/PrescriptionService'
import PrescriptionRepository from 'ts/service/PrescriptionRepository'

export default class PrescriptionViewController {

    public prescription: Prescription;

    public allDispenses: Array<DrugItem>;
    public openDrugs: Array<DrugItem>;
    public freshDispense: Dispense;

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
                this.fillAllDispenses();
                this.fillOpenDrugs();
                if (this.openDrugs.length > 0) {
                    this.fillFreshDispense();
                }
            }, (error) => {
                this.$log.error(error);
                });
       
        }

    fillAllDispenses() {
        this.allDispenses = new Array<DrugItem>();
        this.prescription.Dispenses.forEach((dispense: Dispense) => {
            dispense.DrugItems.forEach((drug: DrugItem) => {
                let indexInAllDispense = this.allDispenses.map((dispensedDrug: DrugItem) => {
                    return dispensedDrug.Id;
                }).indexOf(drug.Id);

                this.$log.debug("indexInAllDispense:");
                this.$log.debug(indexInAllDispense);

                if (indexInAllDispense !== -1) {
                    this.allDispenses[indexInAllDispense].Quantity += drug.Quantity;
                } else {
                    this.allDispenses.push(drug);
                }
                });
        });
        this.$log.debug("AllDispenses:");
        this.$log.debug(this.allDispenses);
    }

    fillOpenDrugs() {
        this.openDrugs = new Array<DrugItem>();
        this.prescription.Drugs.forEach((drugItem: DrugItem) => {
            this.$log.debug(drugItem);
            this.openDrugs.push(drugItem);
        });
        this.$log.debug("openDrugs before Fill:");
        this.$log.debug(this.openDrugs);
        this.allDispenses.forEach((dispensedDrug: DrugItem) => {
            let indexInOpenDrugs = this.openDrugs.map((prescribedDrug: DrugItem) => {
                return prescribedDrug.Id;
            }).indexOf(dispensedDrug.Id);

            if (indexInOpenDrugs !== -1) {
                this.openDrugs[indexInOpenDrugs].Quantity -= dispensedDrug.Quantity;
            } else {
                this.$log.error("DrugItem Dispended, that was not Prescribed!");
            }
        });
        this.openDrugs.filter((openDrugs: DrugItem) => {
            return openDrugs.Quantity > 0;
        });
        this.$log.debug("OpenDrugs");
        this.$log.debug(this.openDrugs);
    }

    addToDispense(drugItem: DrugItem) {
        this.$log.debug(drugItem + " hinzugefügt");
        this.$log.debug(this.freshDispense);
        this.$log.debug("openDrugs:");
        this.$log.debug(this.openDrugs);
        this.changeQuantityInFreshDispense(drugItem.Id, drugItem.Quantity);
    }

    removeFromDispense(drugItem: DrugItem) {
        this.$log.debug(drugItem + " entfernt");
        this.$log.debug(this.freshDispense);
        this.$log.debug("openDrugs:");
        this.$log.debug(this.openDrugs);
        this.changeQuantityInFreshDispense(drugItem.Id, -drugItem.Quantity);
    }

    fillFreshDispense() {
        this.freshDispense = new Dispense();
        this.openDrugs.forEach((openDrug: DrugItem) => {
            this.freshDispense.DrugItems.push(openDrug);
            this.freshDispense.DrugItems[this.freshDispense.DrugItems.length - 1].Quantity = 0;
        });
        this.$log.debug("FreshDispense");
        this.$log.debug(this.freshDispense);
    }

    changeQuantityInFreshDispense(id: string, quantity: number) {
        let indexInOpenDrugs = this.openDrugs.map((openDrug: DrugItem) => {
            return openDrug.Id;
        }).indexOf(id);

        this.openDrugs[indexInOpenDrugs].Quantity -= quantity;

        let indexInFreshDispense = this.freshDispense.DrugItems.map((dispensedDrugs: DrugItem) => {
            return dispensedDrugs.Id;
        }).indexOf(id);

        this.freshDispense.DrugItems[indexInFreshDispense].Quantity += quantity;
    }
}