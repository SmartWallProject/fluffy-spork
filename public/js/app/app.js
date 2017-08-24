'use strict';

let app = angular.module('mainApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl : 'startbootstrap-freelancer-gh-pages/index.html'
    })
    .when('/myJobs', {
        templateUrl : 'html/userJobs.html',
        controller : 'userJobsController'
    })
    .when('/jobs', {
        templateUrl : 'html/jobs.html',
        controller : 'jobsController'

    })
    .otherwise({    
        templateUrl: 'html/error.html'
    })
  });