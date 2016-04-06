import Drug from '../model/drug'
import DrugRepository from '../service/DrugRepository'

export class DrugSearchController {
    drugs: Array<Drug>;
    searchedDrug: String;
    searchResults: Number;

    static $inject = [
        'DrugRepository',
        '$mdDialog'
    ];

    constructor(private drugRepository: DrugRepository, private $mdDialog: angular.material.IDialogService) {
        this.drugs = new Array<Drug>();
        for (var i = 0; i < 100; i++){
            this.drugs[i] = new Drug();
            this.drugs[i].composition = "composition";
            this.drugs[i].drugDescription = "description" + i;
        }
        this.searchResults = this.drugs.length;
        //this.drugs = [];
    }

    getDrugs(drugs: String): void {
        this.drugRepository.getDrugs(drugs).then((foundDrugs) => {
            this.drugs = foundDrugs;
        }, (errorReason) => {
            console.log(errorReason);
            this.drugs = [];
        });
    }

    searchDrug(searchedDrug: String): void {
        this.searchedDrug = '';
    }

    showDrugDetails(drug: Drug): void {
        this.$mdDialog.show(
            this.$mdDialog.alert()
                .title('Medikamenten Details')
                .textContent("TODO: String nicht zu string kompatibel")
                .ok('OK')
        );
    };
}