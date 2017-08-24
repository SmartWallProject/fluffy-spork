'use strict';

angular.module('mainApp')
    .service('taskService', ['$resource', function ($resource) {
        let Task = $resource('/api/task/:taskId', {taskId:'@id'});

        return {

            // gets all tasks of a certain job
            getAllJobTasks: function (jobId) {

            },

            submitTaskSolution: function (taskSolution) {

            }

        }
    }])