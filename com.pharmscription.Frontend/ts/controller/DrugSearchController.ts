import Drug from 'ts/model/drug'
import DrugRepository from 'ts/service/DrugRepository'
import DrugSearchItems from 'ts/model/drugSearchItems'
import DrugService from 'ts/service/DrugService'

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


    static $inject = [
        '$scope',
        'DrugRepository',
        '$mdDialog',
        '$log',
        '$mdToast',
        '$location',
        'DrugService'
    ];

    constructor(private $scope: IDrugSearchScope, private drugRepository: DrugRepository, private $mdDialog: angular.material.IDialogService, private $log: angular.ILogService, private $mdToast: angular.material.IToastService, private $location: angular.ILocationService, private drugService: DrugService) {
        this.setProgressCircle(false);
        this.chooseViewMode();
    }

    chooseViewMode(): void {
        if (this.$location.url() === "/prescription/drug/search") {
            this.controllerMode = Mode.addMode
        } else {
            this.controllerMode = Mode.standardMode;
        }
    }

    setProgressCircle(status: boolean): void {
        this.progressFlag = status;
    }

    getDrugs(searchTerm: string): void {
        //this.setProgressCircle(true);
        this.lastSearchTerm = searchTerm;
        this.$scope.searchForm.$setUntouched();
        this.searchedDrug = '';
        this.drugSearchResults = new DrugSearchItems(this.$scope, this.drugRepository, searchTerm);
    }

    showToast(message: string) {
        this.$mdToast.show(this.$mdToast.simple().textContent(message));
    }

    addDrug(drug: Drug): void {
        this.$log.debug(drug);
        this.drugService.setDrug(drug);
        this.$location.url('prescription/create');
    };
}