import Drug from 'ts/model/drug'
import DrugRepository from 'ts/service/DrugRepository'
import DrugSearchItems from 'ts/model/drugSearchItems'
import PrescriptionService from 'ts/service/PrescriptionService'
import DrugItem from 'ts/model/DrugItem'

export interface IDrugSearchScope extends angular.IScope {
    searchForm: angular.IFormController;
}

enum Mode {
    addMode = 1,
    standardMode = 2
}


export default class DrugSearchController {
    searchedDrug: string;
    lastSearchTerm: string;
    searchResultAmount: Number;
    progressFlag: boolean;
    drugSearchResults: DrugSearchItems;
    controllerMode: Mode;
    hasResultInfo: boolean;


    static $inject = [
        '$scope',
        '$q',
        'DrugRepository',
        '$mdDialog',
        '$log',
        '$mdToast',
        '$location',
        'PrescriptionService'
    ];

    constructor(
        private $scope: IDrugSearchScope,
        private $q: angular.IQService,
        private drugRepository: DrugRepository,
        private $mdDialog: angular.material.IDialogService,
        private $log: angular.ILogService,
        private $mdToast: angular.material.IToastService,
        private $location: angular.ILocationService,
        private prescriptionService: PrescriptionService) {
            this.setProgressCircle(false);
            this.chooseViewMode();
    }

    chooseViewMode(): void {
        if (this.$location.url() === "/prescription/drug/search" || this.$location.url() === "/prescription/edit/drug/search") {
            this.controllerMode = Mode.addMode;
        } else {
            this.controllerMode = Mode.standardMode;
        }
    }

    setProgressCircle(status: boolean): void {
        this.progressFlag = status;
    }

    getDrugs(searchTerm: string): void {
        //this.setProgressCircle(true);
        this.hasResultInfo = false;
        this.lastSearchTerm = searchTerm;
        this.$scope.searchForm.$setUntouched();
        this.searchedDrug = '';
        this.drugSearchResults = new DrugSearchItems(this.$mdToast, this.$q, this.$scope, this.drugRepository, searchTerm, () => { this.hasResultInfo = true; });
    }

    showToast(message: string) {
        this.$mdToast.show(this.$mdToast.simple().textContent(message));
    }

    addDrug(drug: Drug): void {
        this.prescriptionService.setDrugItem(new DrugItem(drug));
        if (this.$location.url() === "/prescription/drug/search") {
            this.$location.url('prescription/create');
        } else {
            this.$location.url('prescription/edit');
        }
    };
}