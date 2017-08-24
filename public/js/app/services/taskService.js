'use strict';

angular.module('mainApp')
    .service('taskService', ['$resource', function ($resource) {
        return {

            // gets all tasks of a certain job
            getAllJobTasks: function (jobId) {

            },

            submitTaskSolution: function (taskSolution) {

            }

        }
    }])