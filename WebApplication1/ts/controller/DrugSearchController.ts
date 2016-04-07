import Drug from '../model/drug'
import DrugRepository from '../service/DrugRepository'

export class DrugSearchController {
    drugs: Array<Drug>;
    searchedDrug: string;
    searchResults: Number;

    static $inject = [
        'DrugRepository',
        '$mdDialog',
        '$log'
    ];

    constructor(private drugRepository: DrugRepository, private $mdDialog: angular.material.IDialogService, private $log: angular.ILogService) {
        this.drugs = new Array<Drug>();
        this.drugs = [];
    }

    getDrugs(drugs: string): void {
        this.searchedDrug = '';
        this.drugRepository.getDrugs(drugs).then((foundDrugs) => {
            this.drugs = foundDrugs;
            this.$log.debug('got drugs');
            this.$log.debug(this.drugs);
        }, (errorReason) => {
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