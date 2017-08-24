'use strict';

angular.module('mainApp')
.service('jobService', ['$resource', function($resource) {
    let Job = $resource('/api/job/:jobId', {jobId:'@id'});

    //let UserJob = $resource('/user/jobs/:userJobId', {userJobid : '@id'});
    
    return {
        getAllJobs : function() {
            return Job.query().$promise;
        },
        getJobById : function(jobId) {
          return Job.get({jobId : jobId}).$promise;
        }
    }
}])