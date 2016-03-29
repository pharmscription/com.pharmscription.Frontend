export interface IScopeMainSideMenu extends ng.IScope {
    close: Function;
}

export class MainSideMenuController {

    public static $inject = [
        '$scope',
        '$timeout',
        '$mdSidenav',
        '$log'
    ];
    constructor(private $scope: any, $timeout: ng.ITimeoutService, $mdSidenav: angular.material.ISidenavService, $log: ng.ILogService) {
        $scope.close = () => {
            $mdSidenav('left').close()
                .then(() => {
                    $log.debug("close LEFT is done");
                });
        };
    }
}