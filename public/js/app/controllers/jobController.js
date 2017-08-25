'use strict';

angular.module('mainApp')
    .controller('jobController', ['jobService', 'taskService', '$routeParams', '$sce', '$scope', function (jobService, taskService, $routeParams, $sce, $scope) {
        let self = this;
        let jobId = $routeParams.jobId;
        
        this.isAssignable = false;
        this.isRemovable = false;

        jobService.getMyJobs().then(function(res) {
            for (let job of res){
                if (job.job_id == jobId){
                    self.isAssignable = false;
                    self.isRemovable = true;
                    return;
                }
            }
            self.isAssignable = true;
            self.isRemovable = false;
        })


        this.assignToMe = function() {
            return jobService.assignJobToMe(jobId)
            .then(function(res) {
                self.isRemovable = true;
                self.isAssignable = false;
            })
            .catch(function(res) {
                console.error("Failed assigning job to user.");
            });
        }

        this.dropJob = function() {
            return jobService.dropJob(jobId)
            .then(function(res){
                self.isRemovable = false;
                self.isAssignable = true;
            })
            .catch(function(res) {
                console.error("Failed dropping job from user.");
            });
        }


        $scope.fix_editor = function fix_editor(id)
                    {
                        var editor = ace.edit(id);
                        editor.setTheme("ace/theme/monokai");
                        editor.getSession().setMode("ace/mode/python");
                        editor.setFontSize(16);
                    };

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
        this.submit_code = function(task, editor_id) {
            var code = ace.edit(editor_id).getValue();
            return taskService.submitTaskSolution(task.task_id, code)
                .then(function (res) {
                    task.solutionInvalid = false;
                    task.solutionValid = true;
                    task.message = $sce.trustAsHtml(res.msg);
                })
                .catch(function (res) {
                    task.solutionInvalid = true;    
                    task.solutionValid = false;

                    task.message = $sce.trustAsHtml(res.data.msg);
                });
        }
    }])