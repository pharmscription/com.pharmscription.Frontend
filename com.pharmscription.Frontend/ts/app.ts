import 'angular-material'
import 'angular-route'
import 'angular-messages'
import moment from 'moment'
import 'moment/locale/de'

import 'ng-slide-down'

moment.locale('de');

import MainMenuController from './controller/MainMenuController'
import MainSideMenuController from './controller/MainSideMenuController'
import UserRegisterController from './controller/UserRegisterController'
import UserSearchController from './controller/UserSearchController'
import UserOverviewController from 'ts/controller/UserOverviewController'
import DrugSearchController from './controller/DrugSearchController'
import PrescriptionCreatorController from 'ts/controller/PrescriptionCreatorController'

import PatientRepository from './service/PatientRepository'
import DrugRepository from './service/DrugRepository'
import PrescriptionRepository from 'ts/service/PrescriptionRepository'
import DrugService from './service/DrugService'
import AHVNumberService from './service/AHVNumberService'
import PatientService from 'ts/service/PatientService'
import SocialNumber from './directives/socialnumber'

export default angular.module('app', ['ngMaterial', 'ngMessages', 'ngRoute', 'ng-slide-down'])
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
        }).when('/user/edit', {
            templateUrl: 'views/user-register.html',
            controller: 'UserRegisterController',
            controllerAs: 'UserRegister'
        }).when('/user/overview', {
            templateUrl: 'views/user-overview.html',
            controller: 'UserOverviewController',
            controllerAs: 'UserOverview'
        }).when('/drug/search', {
            templateUrl: 'views/drug-search.html',
            controller: 'DrugSearchController',
            controllerAs: 'DrugSearch'
        }).when('/prescription/create', {
            templateUrl: 'views/prescription-creator.html',
            controller: 'PrescriptionCreatorController',
            controllerAs: 'PrescriptionCreator'
        }).when('/prescription/drug/search', {
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
    .controller('UserOverviewController', UserOverviewController)
    .controller('DrugSearchController', DrugSearchController)
    .controller('PrescriptionCreatorController', PrescriptionCreatorController)
    .service('PatientRepository', PatientRepository)
    .service('DrugRepository', DrugRepository)
    .service('PrescriptionRepository', PrescriptionRepository)
    .service('DrugService', DrugService)
    .service('AHVNumberService', AHVNumberService)
    .service('PatientService', PatientService)
    .directive('ngSocialnumber', SocialNumber.factory());