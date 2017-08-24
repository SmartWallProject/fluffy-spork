'use strict';

let app = angular.module('mainApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl : 'public/startbootstrap-freelancer-gh-pages/index.html'
    })
    .when('/myJobs', {
        templateUrl : 'html/userJobs.html',
        controller : 'userJobsController as controller'
    })
    .when('/jobs', {
        templateUrl : 'public/html/jobs.html',
        controller : 'jobsController as controller'
    })
    .when('/job/:jobId', {
        templateUrl : 'public/html/job.html',
        controller : 'jobController as controller'
    })
    .otherwise({    
        templateUrl: 'html/error.html'
    })
  });