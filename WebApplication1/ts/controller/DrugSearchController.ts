import Drug from '../model/drug'
import DrugRepository from '../service/DrugRepository'

export class DrugSearchController {
    drugs: Array<Drug>;
    searchedDrug: string;
    searchedWord: string;
    searchResultAmount: Number;
    progressFlag: boolean;


    static $inject = [
        'DrugRepository',
        '$mdDialog',
        '$log',
        '$mdToast'
    ];

    constructor(private drugRepository: DrugRepository, private $mdDialog: angular.material.IDialogService, private $log: angular.ILogService, private $mdToast: angular.material.IToastService) {
        this.setProgressCircle(false);
        this.drugs = new Array<Drug>();
        this.drugs = [];
    }

    setProgressCircle(status: boolean): void {
        this.progressFlag = status;
    }

    getDrugs(drugs: string): void {
        this.setProgressCircle(true);
        this.searchedWord = drugs;
        this.searchedDrug = '';
        this.drugRepository.getDrugs(drugs).then((foundDrugs) => {
            this.setProgressCircle(false);
            this.drugs = foundDrugs;
            this.searchResultAmount = this.drugs.length;
            if (this.searchResultAmount == 0) {
                this.showToast('Keine Suchtreffer gefunden');
            }
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
                .textContent(drug.DrugDescription)
                .ok('OK')
        );
    };
}