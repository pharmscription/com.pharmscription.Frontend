import 'angular-material'
import 'angular-route'
import 'angular-messages'

import {MainMenuController} from './controller/MainMenuController';
import {MainSideMenuController} from './controller/MainSideMenuController'
import {UserRegisterController} from './controller/UserRegisterController'
import {UserSearchController} from './controller/UserSearchController'
import {PatientRepository} from './service/PatientRepository'
import {AHVNumberService} from './service/AHVNumberService'
import SocialNumber from './directives/socialnumber'

export default angular.module('app', ['ngMaterial','ngMessages', 'ngRoute'])
    .config(($mdThemingProvider: angular.material.IThemingProvider) => {
        $mdThemingProvider.theme('default').primaryPalette('green').accentPalette('orange');
    })
    .config(($routeProvider: angular.route.IRouteProvider) => {
        $routeProvider.when('/', {
            templateUrl: 'views/user-search.html',
            controller: 'UserSearchController',
            controllerAs: 'UserSearch'
            })
            .when('/user/register', {
            templateUrl: 'views/user-register.html',
            controller: 'UserRegisterController',
            controllerAs: 'UserRegister'
        }).otherwise({
            redirectTo: '/'
        });
    })
    .controller('MainMenuController', MainMenuController)
    .controller('MainSideMenuController', MainSideMenuController)
    .controller('UserRegisterController', UserRegisterController)
    .controller('UserSearchController', UserSearchController)
    .service('PatientRepository', PatientRepository)
    .service('AHVNumberService', AHVNumberService)
    .directive('ngSocialnumber', SocialNumber.factory());