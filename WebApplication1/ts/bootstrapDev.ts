///<reference path="../tools/typings/main.d.ts"/>
import * as angular from 'angular'
import appDev from './appDev'

angular.element(document).ready(() => {
    angular.bootstrap(document, [appDev.name]);
});