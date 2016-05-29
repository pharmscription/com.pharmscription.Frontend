export default class SocialNumber implements angular.IDirective{
    public link: angular.IDirectiveLinkFn;
    public scope: {};
    public restrict = 'A';
    public require = 'ngModel';

    checkSocialNumber(socialNumber: string): boolean {
        let input = socialNumber;
        let socialArray = this.stringToIntArray(input);
        if (socialArray.length !== 13)
            return false;
        let checksum = socialArray[socialArray.length - 1];
        let calculatedChecksum = this.calcChecksum(socialArray);
        if (checksum === calculatedChecksum)
            return true;
        return false;

    }

    stringToIntArray(string: string): Array<number> {
        let stringArray = string.split("");
        return stringArray.map((s) => {
            return parseInt(s);
        }).filter((item) => {
            if (isNaN(item))
                return false;
            return true;
        });
    }

    calcChecksum(socialNumber: Array<number>): number {

        let sum3 = 0;
        let sum1 = 0;
        for (let i = 0; i < socialNumber.length - 1; i = i + 2) {
            sum3 = sum3 + socialNumber[i];
        }
        for (let j = 1; j < socialNumber.length - 1; j = j + 2) {
            sum1 = sum1 + (socialNumber[j] * 3);
        }
        return 10 - ((sum3 + sum1) % 10);

    }

    public socialnumber: angular.IModelValidators;

    constructor(/*list of dependencies*/) {
        // It's important to add `link` to the prototype or you will end up with state issues.
        // See http://blog.aaronholmes.net/writing-angularjs-directives-as-typescript-classes/#comment-2111298002 for more information.
        this.socialnumber = {
            'socialnumber': (modelValue) => {
                return this.checkSocialNumber(modelValue);
            }
        };
        SocialNumber.prototype.link = (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: ng.IAttributes, ngModel: angular.INgModelController) => {
            /*handle all your linking requirements here*/
            ngModel.$validators = this.socialnumber;

        };
    }

    public static factory(): void {
        var directive = (/*list of dependencies*/) => {
            return new SocialNumber(/*list of dependencies*/);
        };

        //['$inject'] = ['/*list of dependencies*/'];

        return directive;
    }
}
