'use strict';

angular.module('mainApp')
    .controller('jobController', ['jobService', '$routeParams', '$sce', "taskService" ,function (jobService, $routeParams, $sce, taskService) {
        let self = this;
        let jobId = $routeParams.jobId;
        
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
        
        this.submit_code = function(task_id, code) {
            return taskService.submitTaskSolution(task_id, code)
            .then(function(res) {
                self.taskMessage = res.msg;
            })
            .catch(function(res){
                self.taskMessage = res.msg;  
            })
            
        }
    }])