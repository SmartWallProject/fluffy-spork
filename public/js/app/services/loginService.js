'use strict';

angular.module('mainApp')
.service('loginService', ['$resource', function($resource) {
    let Login = $resource('/api/login');
    let Register = $resource('/api/register');
    let UserInfo = $resource('/api/user/info');


    return {
        login : function(data) {
            return Login.save(data).$promise;
        },
        register : function(data) {
            return Register.save(data).$promise;
        },
        is_logged_in : function() {
            return UserInfo.get().$promise;
        }
    }
}])