import Drug from '../model/drug'
import DrugRepository from '../service/DrugRepository'

export class DrugSearchController {
    drugs: Array<Drug>;
    searchedDrug: string;
    searchResultAmount: Number;
    progressFlag: boolean;


    static $inject = [
        'DrugRepository',
        '$mdDialog',
        '$log'
    ];

    constructor(private drugRepository: DrugRepository, private $mdDialog: angular.material.IDialogService, private $log: angular.ILogService) {
        this.setProgressCircle(false);
        this.drugs = new Array<Drug>();
        this.drugs = [];
    }

    setProgressCircle(status: boolean): void {
        this.progressFlag = status;
    }

    getDrugs(drugs: string): void {
        this.setProgressCircle(true);
        console.log("hallo");
        this.searchedDrug = '';
        this.drugRepository.getDrugs(drugs).then((foundDrugs) => {
            this.setProgressCircle(false);
            this.drugs = foundDrugs;
            this.searchResultAmount = this.drugs.length;
            this.$log.debug('got drugs');
            this.$log.debug(this.drugs);
        }, (errorReason) => {
            this.setProgressCircle(false);
            this.searchResultAmount = 0;
            this.$log.error(errorReason);
            this.drugs = [];
        });
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