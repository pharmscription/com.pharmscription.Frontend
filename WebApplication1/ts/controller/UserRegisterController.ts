export interface IUserRegisterScope extends angular.IScope{
    hello: String
}

export class UserRegisterController {

    public static $inject = [
        '$scope'
    ];

    constructor($scope: IUserRegisterScope) {
        $scope.hello = 'salüü';
    }
}