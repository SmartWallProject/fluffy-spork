'use strict';

let app = angular.module('mainApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
      templateUrl : 'public/html/index.html'
    })
    .otherwise({
        templateUrl: 'public/html/error.html'
    })
  });