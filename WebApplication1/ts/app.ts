import 'angular-material'
import 'angular-route'

import {MainMenuController} from './controller/MainMenuController';
import {MainSideMenuController} from './controller/MainSideMenuController'
import {UserRegisterController} from './controller/UserRegisterController'

export default angular.module('app', ['ngMaterial', 'ngRoute'])
    .config(($mdThemingProvider: angular.material.IThemingProvider) => {
        $mdThemingProvider.theme('default').primaryPalette('green').accentPalette('orange');
    })
    .config(($routeProvider: angular.route.IRouteProvider) => {
        $routeProvider.when('/user/register', {
            templateUrl: 'views/user-register.html',
            controller: 'UserRegisterController'
        }).otherwise({
            redirectTo: '/'
        });
    })
    .controller('MainMenuController', MainMenuController)
    .controller('MainSideMenuController', MainSideMenuController)
    .controller('UserRegisterController', UserRegisterController);