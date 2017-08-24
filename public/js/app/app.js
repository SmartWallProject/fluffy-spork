'use strict';

let app = angular.module('mainApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl : 'html/home.html'
    })
    .otherwise({    
        templateUrl: 'html/error.html'
    })
  });