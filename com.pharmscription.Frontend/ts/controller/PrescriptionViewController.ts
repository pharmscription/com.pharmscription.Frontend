import Prescription from 'ts/model/prescription'
import Dispense from 'ts/model/dispense'
import DrugItem from 'ts/model/drugitem'
import Drugist from 'ts/model/drugist'

import PrescriptionService from 'ts/service/PrescriptionService'
import PrescriptionRepository from 'ts/service/PrescriptionRepository'
import DispenseRepository from 'ts/service/DispenseRepository'

export default class PrescriptionViewController {

    public prescription: Prescription;

    public dispenseHistory: Array<Dispense>;

    public allDispenses: Array<DrugItem>;
    public openDrugs: Array<DrugItem>;
    public freshDispense: Dispense;

    static $inject = [
        '$log',
        '$mdToast',
        'PrescriptionService',
        'PrescriptionRepository',
        'DispenseRepository'
    ];

    constructor(
        private $log: angular.ILogService,
        private $mdToast: angular.material.IToastService,
        private prescriptionService: PrescriptionService,
        private prescriptionRepository: PrescriptionRepository,
        private dispenseRepository: DispenseRepository) {
            let patientId = this.prescriptionService.getPatientId();
            let prescriptionId = this.prescriptionService.getPrescriptionId();
            this.prescriptionRepository.getPrescription(patientId, prescriptionId).then((foundPrescription) => {
                this.prescription = foundPrescription;
                this.dispenseHistory = angular.copy(this.prescription.Dispenses);
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
        this.allDispenses = [];
        this.prescription.Dispenses.forEach((dispense: Dispense) => {
            dispense.DrugItems.forEach((drug: DrugItem) => {
                let indexInAllDispense = this.allDispenses.map((dispensedDrug: DrugItem) => {
                    return dispensedDrug.Id;
                }).indexOf(drug.Id);
                if (indexInAllDispense !== -1) {
                    this.allDispenses[indexInAllDispense].Quantity += drug.Quantity;
                } else {
                    this.allDispenses.push(drug);
                }
            });
        });
    }

    fillOpenDrugs() {
        this.openDrugs = angular.copy(this.prescription.Drugs);
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
    }

    addToDispense(drugItem: DrugItem) {
        this.changeQuantityInFreshDispense(drugItem.Id, drugItem.Quantity, false);
    }

    removeFromDispense(drugItem: DrugItem) {
        this.changeQuantityInFreshDispense(drugItem.Id, -drugItem.Quantity, false);
    }

    fillFreshDispense() {
        
        if (this.prescription.Dispenses.length === 0 || this.prescription.Dispenses[this.prescription.Dispenses.length - 1].SignedBy !== null) {
            this.freshDispense = new Dispense();
            this.openDrugs.forEach((openDrug: DrugItem) => {
                this.freshDispense.DrugItems.push(angular.copy(openDrug));
                this.freshDispense.DrugItems[this.freshDispense.DrugItems.length - 1].Quantity = 0;
            });
        } else {
            this.freshDispense = this.prescription.Dispenses[this.prescription.Dispenses.length - 1];
            this.freshDispense.DrugItems.forEach((drugItem: DrugItem) => {
                let openDrugPos = this.openDrugs.map((openDrug: DrugItem) => {
                    return openDrug.Id;
                }).indexOf(drugItem.Id);

                this.openDrugs[openDrugPos].Quantity -= drugItem.Quantity;
            });
        }
    }

    changeQuantityInFreshDispense(id: string, quantity: number, byButton: boolean) {
        let indexInOpenDrugs = this.openDrugs.map((openDrug: DrugItem) => {
            return openDrug.Id;
        }).indexOf(id);

        this.openDrugs[indexInOpenDrugs].Quantity -= quantity;

        let indexInFreshDispense = this.freshDispense.DrugItems.map((dispensedDrugs: DrugItem) => {
            return dispensedDrugs.Id;
        }).indexOf(id);

        if (!byButton) {
            this.freshDispense.DrugItems[indexInFreshDispense].Quantity += quantity;
        }
    }

    changeQuantityAction(id: string, newValue: number, oldValue: number) {
        let quantityDiff: number;
        if (typeof newValue !== 'number') {
            quantityDiff = 0 - oldValue;
        } else {
            quantityDiff = newValue - oldValue;
        }
        this.$log.debug('QuantityDiff: ' + quantityDiff);
        this.changeQuantityInFreshDispense(id, quantityDiff, true);
    }

    saveDispense() {
        this.$log.debug(this.prescription.Patient.Id);
        this.$log.debug(this.prescription.Id);
        this.dispenseRepository.addDispense(this.prescription.Patient.Id, this.prescription.Id, this.freshDispense).then((newDispense) => {
            this.showToast('Rezeptabgabe erfolgreich gespeichert');
        }, (error) => {
            this.showToast('Rezept konnte nicht gespeichert werden');
        });
    }

    signDispense() {
        let signor = new Drugist();
        signor.FirstName = "Señor";
        signor.LastName = "Signor";
        this.freshDispense.SignedBy = signor;
        this.freshDispense.Date = new Date();
        this.saveDispense();
    }

    showToast(message: string) {
        this.$mdToast.show(this.$mdToast.simple().textContent(message));
    }
}