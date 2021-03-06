'use strict';

let app = angular.module('mainApp', ['ngRoute', 'ngResource']);

app.config(function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl : 'public/startbootstrap-freelancer-gh-pages/index.html',
      controller : 'homeController as controller'

    })
    .when('/myJobs', {
        templateUrl : 'public/html/jobs.html',
        controller : 'myJobsController as controller'
    })
    .when('/jobs', {
        templateUrl : 'public/html/jobs.html',
        controller : 'jobsController as controller'
    })
    .when('/job/:jobId', {
        templateUrl : 'public/html/job.html',
        controller : 'jobController as controller'
    })
    .when('/store', {
        templateUrl : 'public/html/store.html',
        controller : 'storeController as controller'
    })
    .otherwise({    
        templateUrl: 'public/html/error.html'
    })
  });