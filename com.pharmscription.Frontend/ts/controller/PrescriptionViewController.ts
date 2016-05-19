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
                this.$log.debug(this.openDispense);
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
                            return dispensedDrug.Id;
                        }).indexOf(drug.Id);
                        if (indexInAllDispense !== -1) {
                            this.allDispensedDrugItems[indexInAllDispense].Quantity += drug.Quantity;
                        } else {
                            this.allDispensedDrugItems.push(drug);
                        }
                    });
                }
            });
        }
    }

    fillOpenDrugs() {
        this.openDrugItems = angular.copy(this.prescription.Drugs);
        this.allDispensedDrugItems.forEach((dispensedDrug: DrugItem) => {
            let indexInOpenDrugs = this.openDrugItems.map((prescribedDrug: DrugItem) => {
                return prescribedDrug.Id;
            }).indexOf(dispensedDrug.Id);

            if (indexInOpenDrugs !== -1) {
                this.openDrugItems[indexInOpenDrugs].Quantity -= dispensedDrug.Quantity;
            } else {
                this.$log.error("DrugItem Dispended, that was not Prescribed!");
            }
        });

        this.openDrugsItemsMaxQuantity = angular.copy(this.openDrugItems);

        this.openDispense.DrugItems.forEach((drugItemInOpenDispense: DrugItem) => {
            let indexInOpenDrugItems = this.openDrugItems.map((openDrug: DrugItem) => {
                return openDrug.Id;
            }).indexOf(drugItemInOpenDispense.Id);

            if (indexInOpenDrugItems !== -1) {
                this.openDrugItems[indexInOpenDrugItems].Quantity -= drugItemInOpenDispense.Quantity;
            } else {
                this.$log.error("DrugItem in Open Dispense saved, that was not Precribed!");
            }
        });
        
    }

    addToDispense(drugItem: DrugItem) {
        this.changeQuantityInFreshDispense(drugItem.Id, drugItem.Quantity, false);
    }

    removeFromDispense(drugItem: DrugItem) {
        this.changeQuantityInFreshDispense(drugItem.Id, -drugItem.Quantity, false);
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
            return openDrug.Id;
        }).indexOf(id);

        this.openDrugItems[indexInOpenDrugs].Quantity -= quantity;

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
        this.changeQuantityInFreshDispense(id, quantityDiff, true);
    }

    saveDispense() {
        if (this.prescription.Id !== null && this.freshDispense.Id !== undefined) {
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
        } else {
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
        }
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

    prescriptionHasDispenses(): boolean {
        return this.prescription.Dispenses !== undefined && this.prescription.Dispenses !== null && this.prescription.Dispenses.length > 0;
    }

    prescriptionHistoryHasEntries(): boolean {
        return this.prescription.PrescriptionHistory !== undefined && this.prescription.PrescriptionHistory !== null && this.prescription.PrescriptionHistory.length > 0;
    }

    fillOpenDispense(): void {
        let openDispensePos = this.prescription.Dispenses.map((dispense: Dispense) => {
            return dispense.SignedBy;
        }).indexOf(null);

        this.$log.debug(openDispensePos);
        if (openDispensePos !== -1) {
            this.openDispense = this.prescription.Dispenses[openDispensePos];
        }
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
        let conclusion = false;
        this.prescription.Dispenses.forEach((dispense: Dispense) => {
            if (this.isSigned(dispense)) {
                conclusion = true;
            }
        });
        return conclusion;
    }

    isSigned(dispense: Dispense): boolean {
        if (dispense.SignedBy !== null) {
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