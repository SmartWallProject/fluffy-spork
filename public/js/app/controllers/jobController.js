'use strict';

angular.module('mainApp')
    .controller('jobController', ['jobService', '$routeParams', '$sce', function (jobService, $routeParams, $sce) {
        let self = this;
        let jobId = $routeParams.jobId;
        
        this.isAssignable = false;
        this.isRemoveable = false;

        jobService.getMyJobs().then(function(res) {
            for (let job of res){
                if (job.job_id == jobId){
                    self.isAssignable = false;
                    self.isRemoveable = true;
                    return;
                }
            }
            self.isAssignable = true;
            self.isRemoveable = false;
        })


        this.assignToMe = function() {
            return jobService.assignJobToMe(jobId)
            .then(function(res) {
                self.isRemoveable = true;
                self.isAssignable = false;
            })
            .catch(function(res) {
                console.error("Failed assigning job to user.");
            });
        }

        jobService.getJobById(jobId)
            .then(function (res) {
                console.log('Received reponse: ' + res);
                self.job = res;
                self.job.text_before_tasks = $sce.trustAsHtml(self.job.text_before_tasks);
                self.job.tasks = [];
            })
            .then(function () {
                return jobService.getTasksForJobId(jobId);
            })
            .then(function (res) {
                self.job.tasks = res;
                for(var task = 0; task < self.job.tasks.length; task++) {
                    self.job.tasks[task].description = $sce.trustAsHtml(self.job.tasks[task].description);
                }
            })
            .catch(function (res) {
                console.error('Received reponse: ' + res);
            })
    }])