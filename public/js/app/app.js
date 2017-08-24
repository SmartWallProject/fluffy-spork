'use strict';

let app = angular.module('mainApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl : 'startbootstrap-freelancer-gh-pages/index.html'
    })
    .otherwise({    
        templateUrl: 'html/error.html'
    })
  });