'use strict';

angular.module('mainApp')
.service('storeService', ['$resource', function($resource) {
    let Store = $resource('/api/store/list');

    return {
        getAllItems : function() {
            return Store.query().$promise;
        }
    }
}])