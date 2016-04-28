export interface IScopeMainMenu extends ng.IScope {
    $mdMedia: angular.material.IMedia;
    toggleLeft: Function;
}
export default class MainMenuController {

    static $inject = [
        '$scope',
        '$timeout',
        '$mdSidenav',
        '$log',
        '$translate'
    ];

    language: string = 'de';
    languages = ('de en').split(' ').map(language => {
            return { lang: language };
        });

    constructor(
        private $scope: IScopeMainMenu,
        $timeout: ng.ITimeoutService,
        $mdSidenav: angular.material.ISidenavService,
        private $log: ng.ILogService,
        private $translate: angular.translate.ITranslateService) {
            $scope.toggleLeft = () => {
                $mdSidenav('left')
                    .toggle();
            };
    }

    changeLanguage() {
        this.$translate.use(this.language);
    }
}