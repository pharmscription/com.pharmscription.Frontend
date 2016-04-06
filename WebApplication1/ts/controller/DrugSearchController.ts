import Drug from '../model/drug'
import DrugRepository from '../service/DrugRepository'

export class DrugSearchController {
    drugs: Array<Drug>;

    static $inject = [
        'DrugRepository'
    ];

    constructor(private drugRepository: DrugRepository) {
        this.drugs = [];
    }

    getDrugs(drugs: String): void {
        this.drugRepository.getDrugs(drugs).then((foundDrugs) => {
            this.drugs = foundDrugs;
        }, (errorReason) => {
            console.log(errorReason);
            this.drugs = [];
        });
    }
}