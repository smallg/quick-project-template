/**
 * Created by wpguo on 10/23/2015.
 */
'use strict';
var app = angular.module('app', ['ngRoute','controllers']);
app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {templateUrl: 'views/tpl/welcome.html', controller: 'WelcomeCtrl'})
        .when('/test1',{templateUrl: 'views/tpl/test1.html', controller:'Test1Ctrl'})
        .when('/test2',{templateUrl: 'views/tpl/test2.html', controller:'Test2Ctrl'})
        .otherwise({redirectTo: '/'});

    $locationProvider.html5Mode({enabled: true, requireBase: false});
}]);