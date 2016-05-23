export default class MainSideMenuController {

    public static $inject = [
        '$timeout',
        '$mdSidenav',
        '$location',
        '$log'
    ];
    constructor(private $timeout: ng.ITimeoutService,private $mdSidenav: angular.material.ISidenavService, private $location: angular.ILocationService, private $log: ng.ILogService) {

    }

    close(): void {
        this.$mdSidenav('left').close();
    }

    goTo(relativeUrl: string): void {
        this.$location.path(relativeUrl);
        this.close();
    }
}