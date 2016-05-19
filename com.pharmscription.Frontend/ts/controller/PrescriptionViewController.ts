import Prescription from 'ts/model/prescription'
import Dispense from 'ts/model/dispense'
import DrugItem from 'ts/model/drugitem'
import Drugist from 'ts/model/drugist'

import PrescriptionService from 'ts/service/PrescriptionService'
import PrescriptionRepository from 'ts/service/PrescriptionRepository'
import DispenseRepository from 'ts/service/DispenseRepository'

export default class PrescriptionViewController {

    public prescription: Prescription = new Prescription();

    public dispenseHistory: Array<Dispense>;

    public allDispenses: Array<DrugItem>;
    public openDrugs: Array<DrugItem>;
    public openDrugsMax: Array<DrugItem>;
    public freshDispense: Dispense;

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
                this.dispenseHistory = angular.copy(this.prescription.Dispenses);
                this.fillOpenDispense();
                this.$log.debug(this.openDispense);
                this.fillAllDispenses();
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

    fillAllDispenses() {
        this.allDispenses = [];
        if (this.prescriptionHasDispenses()) {
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
        
        this.openDrugs = this.openDrugs.filter((openDrugs: DrugItem) => {
            return openDrugs.Quantity > 0;
        });
        this.openDrugsMax = angular.copy(this.openDrugs);
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
            this.openDrugs.forEach((openDrug: DrugItem) => {
                this.freshDispense.DrugItems.push(angular.copy(openDrug));
                this.freshDispense.DrugItems[this.freshDispense.DrugItems.length - 1].Quantity = 0;
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
}