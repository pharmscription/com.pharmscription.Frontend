import Drug from 'ts/model/drug'
import DrugRepository from 'ts/service/DrugRepository'
import DrugSearchItems from 'ts/model/drugSearchItems'

export class DrugSearchController {
    searchedDrug: string;
    lastSearchTerm: string;
    searchResultAmount: Number;
    progressFlag: boolean;
    drugSearchResults: DrugSearchItems;


    static $inject = [
        '$scope',
        'DrugRepository',
        '$mdDialog',
        '$log',
        '$mdToast'
    ];

    constructor(private $scope: ng.IScope, private drugRepository: DrugRepository, private $mdDialog: angular.material.IDialogService, private $log: angular.ILogService, private $mdToast: angular.material.IToastService) {
        this.setProgressCircle(false);
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

    showDrugDetails(drug: Drug): void {
        this.$mdDialog.show(
            this.$mdDialog.alert()
                .title('Medikamenten Details')
                .textContent("Betäubungsmittel-Kategorie: " + drug.NarcoticCategory)
                .ok('OK')
        );
    };
}