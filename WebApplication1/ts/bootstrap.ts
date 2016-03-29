///<reference path="../tools/typings/main.d.ts"/>
import * as angular from 'angular'
import app from './app'

angular.element(document).ready(() => {
    angular.bootstrap(document, [app.name]);
});