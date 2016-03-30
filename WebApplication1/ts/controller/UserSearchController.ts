export interface IUserSearchScope extends angular.IScope {
    social: String
}

export class UserSearchController {

    public static $inject = [
        '$scope'
    ];

    constructor($scope: IUserSearchScope) {
        $scope.social = '';
    }
}