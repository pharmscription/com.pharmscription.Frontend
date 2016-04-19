export interface IScopeMainMenu extends ng.IScope {
    $mdMedia: angular.material.IMedia;
    toggleLeft: Function;
}
export default class MainMenuController {

    static $inject = [
        '$scope',
        '$timeout',
        '$mdSidenav',
        '$log'
    ];

    constructor(private $scope: IScopeMainMenu, $timeout: ng.ITimeoutService, $mdSidenav: angular.material.ISidenavService, $log: ng.ILogService) {
        $scope.toggleLeft = () => {
            $mdSidenav('left')
                .toggle();
        };
    }
}