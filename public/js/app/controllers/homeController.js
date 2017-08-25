'use strict';

angular.module('mainApp')
    .controller('homeController', ['profileService', 'jobService', function (profileService, jobService) {
        let self = this;
        this.username = "X";
        this.pendingTasks = [];

        profileService.getCurrentUserProfile()
            .then(function (res) {
                console.log("User profile received: " + res);
                self.username = res.username;
            })
            .catch(function (res) {
                console.log("Error retreiving user profile: " + res);
            })

        let setPendingTasks = function () {
            return jobService.getMyJobs()
                .then(function(res) {
                    let allMyJobs = res;
                    for (let job of allMyJobs){
                        jobService.getTasksForJobId(job.job_id)
                        .then(function(res) {
                            self.pendingTasks = self.pendingTasks.concat(res);
                        })
                        .catch(function(res) {
                            console.log('Error retreiving pending taks list for job ' + job.job_id);
                            console.error(res);
                        })
                    }
                })

        }
        setPendingTasks();

    }])