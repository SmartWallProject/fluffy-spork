'use strict';

angular.module('mainApp')
    .service('taskService', ['$resource', function ($resource) {
        let Task = $resource('/task/:taskId', {taskId:'@id'});

        return {

            // gets all tasks of a certain job
            getAllJobTasks: function (jobId) {

            },

            submitTaskSolution: function (taskSolution) {

            }

        }
    }])