'use strict';

angular.module('mainApp')
.service('jobService', ['$resource', function($resource) {
    let Job = $resource('/job/:jobId', {jobId:'@id'});
    let UserJob = $resource('/user/job/:userJobId', {userJobid : '@id'});
    
    return {
        // gets all user jobs, by session context
        getAllUserJobs : function() {
            return UserJob.get().$promise;
        },
        getUserJobById : function(userJobId) {
            return UserJob.get({userJobid : userJobId}).$promise;
        },
        getAllJobs : function() {
            return Job.get().$promise;
        },
        getJobById : function(jobId) {
          return Job.get({jobId : jobId}).$promise;
        }
    }
}])