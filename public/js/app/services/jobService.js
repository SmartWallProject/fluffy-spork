'use strict';

angular.module('mainApp')
    .service('jobService', ['$resource', function ($resource) {
        let Job = $resource('/api/job/:jobId', {
            jobId: '@id'
        });
        let JobTasks = $resource('/api/job/:jobId/tasks', {
            jobId: '@id'
        });
        let MyJobs = $resource('/api/job/self');
        let TakeJob = $resource('/api/job/:jobId/take', {
            jobId: '@id'
        });


        return {
            getAllJobs: function () {
                return Job.query().$promise;
            },
            getJobById: function (jobId) {
                return Job.get({
                    jobId: jobId
                }).$promise;
            },
            getTasksForJobId: function (jobId) {
                return JobTasks.query({
                    jobId: jobId
                }).$promise;
            },
            getMyJobs: function () {
                return MyJobs.query().$promise;
            },
            assignJobToMe: function (jobId) {
                return TakeJob.get({
                    jobId: jobId
                }).$promise;
            }
        }
    }])