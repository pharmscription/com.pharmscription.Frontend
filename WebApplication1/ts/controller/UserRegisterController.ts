export interface IUserRegisterScope extends angular.IScope{
    cantons: Object,
    canton: String,
    save: Function;
}

export class UserRegisterController {

    public static $inject = [
        '$scope',
        '$location'
    ];

    constructor($scope: IUserRegisterScope, $location: angular.ILocationService) {
        $scope.cantons = ('AG AR AI BL BS BE FR GE GL GR JU LU NE NW OW ' +
            'SG SH SZ SO TG TI UR VD VS ZG ZH').split(' ').map(function (canton) {
                return { abbrev: canton };
            });

        $scope.save = () => {
            // TODO
            $location.url('user/overview');
        };
    }
}