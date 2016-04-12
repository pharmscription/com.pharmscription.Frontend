export class MainSideMenuController {

    public static $inject = [
        '$timeout',
        '$mdSidenav',
        '$location',
        '$log'
    ];
    constructor(private $timeout: ng.ITimeoutService,private $mdSidenav: angular.material.ISidenavService, private $location: angular.ILocationService, private $log: ng.ILogService) {

    }

    close() {
        this.$mdSidenav('left').close();
    }

    goTo(relativeUrl: string) {
        this.$location.path(relativeUrl);
        this.close();
    }
}