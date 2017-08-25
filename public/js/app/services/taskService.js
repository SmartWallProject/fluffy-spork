'use strict';

angular.module('mainApp')
    .service('taskService', ['$resource', function ($resource) {
        let Task = $resource('/api/task/:taskId', {taskId:'@id'});
        let TaskSubmit = $resource('/api/task/:taskId/send', {taskId:'@id'});

        return {

            // gets all tasks of a certain job
            getAllJobTasks: function (jobId) {

            },

            submitTaskSolution: function (task_id, taskSolution) {
                return TaskSubmit.save({id: task_id, code: taskSolution}).$promise;
            }

        }
    }])