import Drug from '../model/drug'
import DrugRepository from '../service/DrugRepository'

export class DrugSearchController {
    drugs: Array<Drug>;
    searchedDrug: string;
    searchResults: Number;

    static $inject = [
        'DrugRepository',
        '$mdDialog'
    ];

    constructor(private drugRepository: DrugRepository, private $mdDialog: angular.material.IDialogService) {
        this.drugs = new Array<Drug>();
        this.drugs = [];
    }

    getDrugs(drugs: string): void {
        this.searchedDrug = '';
        this.drugRepository.getDrugs(drugs).then((foundDrugs) => {
            this.drugs = foundDrugs.data;
            console.log("got drugs");
            console.log(this.drugs);
        }, (errorReason) => {
            console.log(errorReason);
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