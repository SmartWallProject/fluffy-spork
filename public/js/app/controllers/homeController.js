'use strict';

angular.module('mainApp')
    .controller('homeController', ['profileService', 'jobService', function (profileService, jobService) {
        let self = this;
        this.username = "X";
        this.pendingTasks = [];
        this.jobList = [];

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
        let setJobList = function() {
            return jobService.getMyJobs()
            .then(function(res){
                let jobList = res;
                let placeholderIndex = 0;
                if (jobList.length > 3){
                    jobList = jobList.splice(0,3);
                }
                else {
                    while (jobList.length < 3){
                        if (placeholderIndex == 0){
                            jobList.push({description: "Explore and assign for new Jobs"});
                        }
                        if (placeholderIndex == 1){
                            jobList.push({description: "Complete jobs to earn ʟҒᴛ"});
                        }
                        if (placeholderIndex == 2) {
                            jobList.push({description: "Buy goodies using your ʟҒᴛ"});
                        }
                        placeholderIndex++;
                    }
                }
                self.jobList = jobList;

            })
            .catch(function(res) {
                console.log("Somthing went wrong requesting jobs.")
                 let jobList = [];
                 let placeholderIndex = 0;
                 while (jobList.length < 3){
                        if (placeholderIndex == 0){
                            jobList.push({description: "Explore and assign for new Jobs"});
                        }
                        if (placeholderIndex == 1){
                            jobList.push({description: "Complete jobs to earn ʟҒᴛ"});
                        }
                        if (placeholderIndex == 2) {
                            jobList.push({description: "Buy goodies using your ʟҒᴛ"});
                        }
                        placeholderIndex++;
                    }
                
                self.jobList = jobList;
            })
        };
        setPendingTasks();
        setJobList();

    }])