'use strict';

angular.module('mainApp')
.service('jobService', ['$resource', function($resource) {
    return {
        // gets all user jobs, by session context
        getAllJobs : function(arguments) {
            // body
        }
    }
}])