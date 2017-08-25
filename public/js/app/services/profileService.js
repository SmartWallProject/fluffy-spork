'use strict';

angular.module('mainApp')
.service('profileService', ['$resource', function($resource) {
    let Profile = $resource('/api/user/info');    
    
    return {
        getCurrentUserProfile : function() {
            return Profile.get().$promise;
        }
    }
}])