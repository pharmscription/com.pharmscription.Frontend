import Drug from '../model/drug'
import DrugRepository from '../service/DrugRepository'

export class DrugSearchController {
    drugs: Array<Drug>;
    searchedDrug: string;
    lastSearchTerm: string;
    searchResultAmount: Number;
    progressFlag: boolean;


    static $inject = [
        '$scope',
        'DrugRepository',
        '$mdDialog',
        '$log',
        '$mdToast'
    ];

    constructor(private $scope: ng.IScope, private drugRepository: DrugRepository, private $mdDialog: angular.material.IDialogService, private $log: angular.ILogService, private $mdToast: angular.material.IToastService) {
        this.setProgressCircle(false);
        this.drugs = new Array<Drug>();
        this.drugs = [];
    }

    setProgressCircle(status: boolean): void {
        this.progressFlag = status;
    }

    getDrugs(searchTerm: string): void {
        this.setProgressCircle(true);
        this.lastSearchTerm = searchTerm;
        this.$scope.searchForm.$setUntouched();
        this.searchedDrug = '';
        this.drugRepository.getDrugs(searchTerm).then((foundDrugs) => {
            this.setProgressCircle(false);
            this.drugs = foundDrugs;
            this.searchResultAmount = this.drugs.length;
            this.$log.debug(this.drugs);
        }, (errorReason) => {
            this.setProgressCircle(false);
            this.searchResultAmount = 0;
            this.$log.error(errorReason);
            this.drugs = [];
            this.showToast('Fehler bei der Suche');
        });
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