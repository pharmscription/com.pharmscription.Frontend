
enum Mode {
    noSideMenu = 1,
    SideMenu = 2
}

export default class MainMenuController {
    mode: Mode;

    static $inject = [
        '$timeout',
        '$mdSidenav',
        '$log',
        '$location'
    ];

    constructor(
        private $timeout: ng.ITimeoutService,
        private $mdSidenav: angular.material.ISidenavService,
        private $log: ng.ILogService,
        private $location: angular.ILocationService) {
        this.setMode();
    }

    toggleLeft(): void {
        this.$mdSidenav('left').toggle();
    }

    setMode() {
        if (this.$location.url() === '/') {
            this.mode = Mode.noSideMenu;
        } else {
            this.mode = Mode.SideMenu;
        }
    }
}
