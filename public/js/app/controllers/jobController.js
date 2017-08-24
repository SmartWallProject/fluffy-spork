'use strict';

angular.module('mainApp')
    .controller('jobController', ['jobService', '$routeParams', function (jobService, $routeParams) {
        let self = this;
        let jobId = $routeParams.jobId;
        jobService.getJobById(jobId)
            .then(function (res) {
                console.log('Received reponse: ' + res);
                self.job = res;
            })
            .then(function () {
                return jobService.getJobById(jobId);
            })
            .then(function (res) {
                self.tasks = res;
            })
            .catch(function (res) {
                console.error('Received reponse: ' + res);
            })
    }])