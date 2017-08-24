'use strict';

angular.module('mainApp')
.controller('jobController', ['jobService', '$routeParams', function(jobService, $routeParams) {
    let self = this;
    
    jobService.getJobById($routeParams.jobId)
    .then(function(res) {
        console.log('Received reponse: ' + res);
        self.job = res;
    })
    .catch(function(res) {
        console.error('Received reponse: ' + res);
    })
}])