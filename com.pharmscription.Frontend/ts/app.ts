import 'angular-material'
import 'angular-route'
import 'angular-messages'
import moment from 'moment'
import 'moment/locale/de'

import 'ng-slide-down'

moment.locale('de');

import MainMenuController from 'ts/controller/MainMenuController'
import MainSideMenuController from 'ts/controller/MainSideMenuController'
import UserRegisterController from 'ts/controller/UserRegisterController'
import UserSearchController from 'ts/controller/UserSearchController'
import UserOverviewController from 'ts/controller/UserOverviewController'
import DrugSearchController from 'ts/controller/DrugSearchController'
import PrescriptionCreatorController from 'ts/controller/PrescriptionCreatorController'
import PrescriptionViewController from 'ts/controller/PrescriptionViewController'

import PatientRepository from 'ts/service/PatientRepository'
import DrugRepository from 'ts/service/DrugRepository'
import PrescriptionRepository from 'ts/service/PrescriptionRepository'
import PrescriptionService from 'ts/service/PrescriptionService'
import DrugService from 'ts/service/DrugService'
import AHVNumberService from 'ts/service/AHVNumberService'
import PatientService from 'ts/service/PatientService'
import SocialNumber from 'ts/directives/socialnumber'

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
        }).when('/prescription/view', {
            templateUrl: 'views/prescription-view.html',
            controller: 'PrescriptionViewController',
            controllerAs: 'PrescriptionView'
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
    .controller('PrescriptionViewController', PrescriptionViewController)
    .service('PatientRepository', PatientRepository)
    .service('DrugRepository', DrugRepository)
    .service('PrescriptionRepository', PrescriptionRepository)
    .service('DrugService', DrugService)
    .service('AHVNumberService', AHVNumberService)
    .service('PatientService', PatientService)
    .service('PrescriptionService', PrescriptionService)
    .directive('ngSocialnumber', SocialNumber.factory());