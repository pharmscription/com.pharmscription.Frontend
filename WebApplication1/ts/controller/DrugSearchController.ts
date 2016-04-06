import Drug from '../model/drug'
import DrugRepository from '../service/DrugRepository'

export class DrugSearchController {
    drugs: Array<Drug>;

    static $inject = [
        'DrugRepository'
    ];

    constructor(private drugRepository: DrugRepository) {
        this.drugs = new Array<Drug>();
        for (var i = 0; i < 100; i++){
            this.drugs[i] = new Drug();
            this.drugs[i].composition = "composition";
            this.drugs[i].drugDescription = "description" + i;
        }
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

    this.doSecondaryAction = function (event) {
        $mdDialog.show(
            $mdDialog.alert()
                .title('Secondary Action')
                .textContent('Secondary actions can be used for one click actions')
                .ariaLabel('Secondary click demo')
                .ok('Neat!')
                .targetEvent(event)
        );
    };
}