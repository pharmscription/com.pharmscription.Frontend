
export default class UserLoginController {
    password: string;
    username: string;

    public static $inject = [
        '$location',
        '$log',
        '$mdToast'
    ];

    constructor(
        private $location: angular.ILocationService,
        private $log: angular.ILogService,
        private $mdToast: angular.material.IToastService) { }
}