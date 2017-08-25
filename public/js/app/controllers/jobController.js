'use strict';

angular.module('mainApp')
    .controller('jobController', ['jobService', '$routeParams', function (jobService, $routeParams) {
        let self = this;
        let jobId = $routeParams.jobId;
        
        jobService.getJobById(jobId)
            .then(function (res) {
                console.log('Received reponse: ' + res);
                self.job = res;
                self.job.tasks = [];
            })
            .then(function () {
                return jobService.getTasksForJobId(jobId);
            })
            .then(function (res) {
                self.job.tasks = res;
            })
            .catch(function (res) {
                console.error('Received reponse: ' + res);
            })
    }])