import Prescription from 'ts/model/prescription'
import Dispense from 'ts/model/dispense'
import DrugItem from 'ts/model/drugitem'
import Drugist from 'ts/model/drugist'

import PrescriptionService from 'ts/service/PrescriptionService'
import PrescriptionRepository from 'ts/service/PrescriptionRepository'
import DispenseRepository from 'ts/service/DispenseRepository'

export default class PrescriptionViewController {

    public prescription: Prescription = new Prescription();

    public signedDispenses: Array<Dispense> = [];

    public allDispensedDrugItems: Array<DrugItem>;
    public openDrugItems: Array<DrugItem>;
    public openDrugsItemsMaxQuantity: Array<DrugItem>;
    public freshDispense: Dispense = new Dispense();
    public openDispense: Dispense = new Dispense();

    static $inject = [
        '$log',
        '$mdToast',
        '$location',
        '$translate',
        'PrescriptionService',
        'PrescriptionRepository',
        'DispenseRepository'
    ];

    constructor(
        private $log: angular.ILogService,
        private $mdToast: angular.material.IToastService,
        private $location: angular.ILocationService,
        private $translate: angular.translate.ITranslateService,
        private prescriptionService: PrescriptionService,
        private prescriptionRepository: PrescriptionRepository,
        private dispenseRepository: DispenseRepository) {
        let patientId = this.prescriptionService.getPatientId();
        let prescriptionId = this.prescriptionService.getPrescriptionId();
        if (prescriptionId !== undefined || patientId !== undefined) {
            this.prescriptionRepository.getPrescription(patientId, prescriptionId).then((foundPrescription) => {
                this.prescription = foundPrescription;
                this.fillOpenDispense();
                this.fillAllDispensedDrugItems();
                this.fillOpenDrugs();
                this.fillFreshDispense();
                $log.debug("Prescription View:");
                $log.debug(this.prescription);
            }, (error) => {
                this.$translate("TOAST.PRESCRIPTION-LOAD-ERROR").then((message) => {
                    this.showToast(message);
                });
                this.$log.error(error);
            });
        } else {
            this.$translate("TOAST.SEARCH-PATIENT").then((message) => {
                this.showToast(message);
                this.$location.url('/');
            });
        }
    }

    fillAllDispensedDrugItems() {
        this.allDispensedDrugItems = [];
        if (this.prescriptionHasDispenses()) {
            this.prescription.Dispenses.forEach((dispense: Dispense) => {
                if (this.isSigned(dispense)) {
                    this.signedDispenses.push(dispense);
                    dispense.DrugItems.forEach((drug: DrugItem) => {
                        let indexInAllDispense = this.allDispensedDrugItems.map((dispensedDrug: DrugItem) => {
                            return dispensedDrug.Drug.Id;
                        }).indexOf(drug.Drug.Id);
                        if (indexInAllDispense !== -1) {
                            this.allDispensedDrugItems[indexInAllDispense].Quantity += drug.Quantity;
                        } else {
                            this.allDispensedDrugItems.push(drug);
                        }
                    });
                }
            });
        }
        this.$log.debug("all Dispensed Drug Items");
        this.$log.debug(this.allDispensedDrugItems);
    }

    fillOpenDrugs() {
        this.openDrugItems = angular.copy(this.prescription.Drugs);
        this.allDispensedDrugItems.forEach((dispensedDrug: DrugItem) => {
            let indexInOpenDrugs = this.openDrugItems.map((prescribedDrug: DrugItem) => {
                return prescribedDrug.Drug.Id;
            }).indexOf(dispensedDrug.Drug.Id);

            if (indexInOpenDrugs !== -1) {
                this.openDrugItems[indexInOpenDrugs].Quantity -= dispensedDrug.Quantity;
            } else {
                this.$log.error("DrugItem Dispended, that was not Prescribed!");
            }
        });

        this.openDrugsItemsMaxQuantity = angular.copy(this.openDrugItems);

        this.openDispense.DrugItems.forEach((drugItemInOpenDispense: DrugItem) => {
            let indexInOpenDrugItems = this.openDrugItems.map((openDrug: DrugItem) => {
                return openDrug.Drug.Id;
            }).indexOf(drugItemInOpenDispense.Drug.Id);

            if (indexInOpenDrugItems !== -1) {
                this.openDrugItems[indexInOpenDrugItems].Quantity -= drugItemInOpenDispense.Quantity;
            } else {
                this.$log.error("DrugItem in Open Dispense saved, that was not Prescribed!");
            }
        });
        this.$log.debug("Open Drug Items:");
        this.$log.debug(this.openDrugItems);
    }

    addToDispense(drugItem: DrugItem) {
        this.changeQuantityInFreshDispense(drugItem.Drug.Id, drugItem.Quantity, false);
    }

    removeFromDispense(drugItem: DrugItem) {
        this.changeQuantityInFreshDispense(drugItem.Drug.Id, -drugItem.Quantity, false);
    }

    fillFreshDispense() {
        if (this.openDispense.Id !== null) {
            this.freshDispense = this.openDispense;
        } else {
            this.freshDispense = new Dispense();
            this.openDrugItems.forEach((openDrug: DrugItem) => {
                this.freshDispense.DrugItems.push(angular.copy(openDrug));
                this.freshDispense.DrugItems[this.freshDispense.DrugItems.length - 1].Quantity = 0;
            });
        }
    }

    changeQuantityInFreshDispense(id: string, quantity: number, byButton: boolean) {
        let indexInOpenDrugs = this.openDrugItems.map((openDrug: DrugItem) => {
            return openDrug.Drug.Id;
        }).indexOf(id);

        if (typeof this.openDrugItems[indexInOpenDrugs].Quantity !== 'number') {
            this.openDrugItems[indexInOpenDrugs].Quantity = 0;
        }
        this.openDrugItems[indexInOpenDrugs].Quantity -= quantity;

        let indexInFreshDispense = this.freshDispense.DrugItems.map((dispensedDrugs: DrugItem) => {
            return dispensedDrugs.Drug.Id;
        }).indexOf(id);

        if (!byButton) {
            if (typeof this.freshDispense.DrugItems[indexInFreshDispense].Quantity !== 'number') {
                this.freshDispense.DrugItems[indexInFreshDispense].Quantity = 0;
            }
            this.freshDispense.DrugItems[indexInFreshDispense].Quantity += quantity;
        }
        this.$log.debug("freshDispense");
        this.$log.debug(this.freshDispense);
        this.$log.debug("OpenDrugItems");
        this.$log.debug(this.openDrugItems);
    }

    changeQuantityAction(id: string, newValue: number, oldValue: number) {
        let quantityDiff: number;
        if (typeof newValue !== 'number') {
            quantityDiff = 0 - oldValue;
        } else {
            quantityDiff = newValue - oldValue;
        }
        this.$log.debug("Quantity Diff");
        this.$log.debug(quantityDiff);
        this.changeQuantityInFreshDispense(id, quantityDiff, true);
    }

    saveDispense() {
        if (this.freshDispense.Id !== null && this.freshDispense.Id !== undefined) {
            this.dispenseRepository.editDispense(this.prescription.Patient.Id, this.prescription.Id, this.freshDispense).then((newDispense) => {
                this.$translate('TOAST.DISPENSE-SAVED').then((message) => {
                    this.showToast(message);
                });
                this.$location.url('user/overview');
            }, (error) => {
                this.$log.error(error);
                this.$translate('TOAST.DISPENSE-SAVED-ERROR').then((message) => {
                    this.showToast(message);
                });
            });
        } else {
            this.dispenseRepository.addDispense(this.prescription.Patient.Id, this.prescription.Id, this.freshDispense).then((newDispense) => {
                this.$translate('TOAST.DISPENSE-SAVED').then((message) => {
                    this.showToast(message);
                });
                this.$location.url('user/overview');
            }, (error) => {
                this.$log.error(error);
                this.$translate('TOAST.DISPENSE-SAVED-ERROR').then((message) => {
                    this.showToast(message);
                });
            });
        }
    }

    signDispense() {
        //let signor = new Drugist();
        //signor.FirstName = "Señor";
        //signor.LastName = "Signor";
        //this.freshDispense.SignedBy = signor;
        this.freshDispense.Date = new Date();
        this.saveDispense();
    }

    showToast(message: string) {
        this.$mdToast.show(this.$mdToast.simple().textContent(message));
    }

    prescriptionHasDispenses(): boolean {
        return this.prescription.Dispenses !== undefined && this.prescription.Dispenses !== null && this.prescription.Dispenses.length > 0;
    }

    prescriptionHistoryHasEntries(): boolean {
        return this.prescription.PrescriptionHistory !== undefined && this.prescription.PrescriptionHistory !== null && this.prescription.PrescriptionHistory.length > 0;
    }

    fillOpenDispense(): void {
        let openDispensePos = this.prescription.Dispenses.map((dispense: Dispense) => {
            return dispense.Date;
        }).indexOf(null);

        if (openDispensePos !== -1) {
            this.openDispense = angular.copy(this.prescription.Dispenses[openDispensePos]);
        }
        this.$log.debug("OpenDispense:");
        this.$log.debug(this.openDispense);
    }

    editPrescription() {
        this.prescriptionService.removeAll();
        this.prescriptionService.setDrugItems(this.prescription.Drugs);
        this.prescriptionService.savePrescriptionState(this.prescription);
        this.prescriptionService.setPatientId(this.prescription.Patient.Id);
        this.prescriptionService.setPrescriptionId(this.prescription.Id);
        this.$location.url('prescription/edit');
    }

    hasSignedDispenses(): boolean {
        return (this.signedDispenses.length > 0);
    }

    isSigned(dispense: Dispense): boolean {
        if (dispense.Date !== null && dispense.Date !== undefined) {
            return true;
        }
        return false;
    }

    freshDispenseHasQuantity(): boolean {
        let dispenseQuantity = 0;
        this.freshDispense.DrugItems.forEach((drugItem: DrugItem) => {
            dispenseQuantity += drugItem.Quantity;
        });
        if (dispenseQuantity > 0) {
            return true;
        }
        return false;
    }
}