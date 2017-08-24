'use strict';

let app = angular.module('mainApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl : 'public/startbootstrap-freelancer-gh-pages/index.html'
    })
    .when('/api/jobs', {
        templateUrl : 'public/html/jobs.html',
        controller : 'jobsController as controller'
        
    })
    .when('/api/jobs/:jobId', {
        controller : 'jobController as controller'
    })
    .otherwise({    
        templateUrl: 'public/html/error.html'
    })
  });