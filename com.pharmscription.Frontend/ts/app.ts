﻿import 'angular-material'
import 'angular-route'
import 'angular-messages'
import moment from 'moment'
import 'moment/locale/de'

moment.locale('de');

import {MainMenuController} from './controller/MainMenuController';
import {MainSideMenuController} from './controller/MainSideMenuController'
import {UserRegisterController} from './controller/UserRegisterController'
import {UserSearchController} from './controller/UserSearchController'
import {DrugSearchController} from './controller/DrugSearchController'
import {PatientRepository} from './service/PatientRepository'
import DrugRepository from './service/DrugRepository'
import {AHVNumberService} from './service/AHVNumberService'
import SocialNumber from './directives/socialnumber'

export default angular.module('app', ['ngMaterial','ngMessages', 'ngRoute'])
    .config(($mdThemingProvider: angular.material.IThemingProvider) => {
        $mdThemingProvider.theme('default').primaryPalette('green').accentPalette('orange').warnPalette('red').backgroundPalette('grey');
    })
    .config(($httpProvider: angular.IHttpProvider) => {
        $httpProvider.defaults.headers.common['Content-Type'] = 'application/json';
    })
    .config(($mdDateLocaleProvider: angular.material.IDateLocaleProvider) => {
        $mdDateLocaleProvider.parseDate = (dateString: string) => {
            let m = moment(dateString, 'DD.MM.YYYY', true);
            return m.isValid() ? m.utc().toDate() : new Date(NaN);
        };
        $mdDateLocaleProvider.formatDate = (date: Date) => {
            if (date === undefined || date ===  null)
                return null;
            return moment(date).format('DD.MM.YYYY');
        };
        $mdDateLocaleProvider.months = moment.months();
        $mdDateLocaleProvider.shortMonths = moment.monthsShort();
        $mdDateLocaleProvider.days = moment.weekdays();
        $mdDateLocaleProvider.shortDays = moment.weekdaysShort();
        $mdDateLocaleProvider.firstDayOfWeek = 1;
    })
    .config(($routeProvider: angular.route.IRouteProvider) => {
        $routeProvider.when('/', {
            templateUrl: 'views/user-search.html',
            controller: 'UserSearchController',
            controllerAs: 'UserSearch'
        }).when('/user/register', {
            templateUrl: 'views/user-register.html',
            controller: 'UserRegisterController',
            controllerAs: 'UserRegister'
        }).when('/drug/search', {
            templateUrl: 'views/drug-search.html',
            controller: 'DrugSearchController',
            controllerAs: 'DrugSearch'
        }).otherwise({
            redirectTo: '/'
        });
    })
    .controller('MainMenuController', MainMenuController)
    .controller('MainSideMenuController', MainSideMenuController)
    .controller('UserRegisterController', UserRegisterController)
    .controller('UserSearchController', UserSearchController)
    .controller('DrugSearchController', DrugSearchController)
    .service('PatientRepository', PatientRepository)
    .service('DrugRepository', DrugRepository)
    .service('AHVNumberService', AHVNumberService)
    .directive('ngSocialnumber', SocialNumber.factory());