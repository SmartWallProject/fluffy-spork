'use strict';

angular.module('mainApp')
.controller('myJobsController', ['jobService', function(jobService) {
    let self = this;
    self.jobList = [];
    
    jobService.getMyJobs()
    .then(function(res) {
        console.log('Received reponse: ' + res);
        self.jobList = res;
    })
    .catch(function(res) {
        console.error('Received reponse: ' + res);
    })
}])