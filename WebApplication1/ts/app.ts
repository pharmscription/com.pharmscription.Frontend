import 'angular-material'

import {MainMenuController} from './controller/MainMenuController';
import {MainSideMenuController} from './controller/MainSideMenuController'

export default angular.module('app', ['ngMaterial'])
    .config(($mdThemingProvider: angular.material.IThemingProvider) => {
        $mdThemingProvider.theme('default').primaryPalette('green').accentPalette('orange');
    })
    .controller('MainMenuController', MainMenuController)
    .controller('MainSideMenuController', MainSideMenuController);