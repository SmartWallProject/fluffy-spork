'use strict';

angular.module('mainApp')
.controller('storeController', ['storeService', function(storeService) {
    let self = this;
    self.itemList = [];
    
    storeService.getAllItems()
    .then(function(res) {
        console.log('Received reponse: ' + res);
        self.itemList = res;
    })
    .catch(function(res) {
        console.error('Received reponse: ' + res);
    })
}])