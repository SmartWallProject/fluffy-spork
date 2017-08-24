'use strict';

angular.module('mainApp')
.controller('jobsController', ['jobService', function(jobService) {
    let self = this;
    self.jobList = [];

    jobService.getAllJobs()
    .then(function(res, data) {
        console.log('Received reponse: ' + res + ' ' + data);
        self.jobList = data.jobList;
    })
    .catch(function(res, data) {
        console.error('Received reponse: ' + res + ' ' + data);
    })
}])