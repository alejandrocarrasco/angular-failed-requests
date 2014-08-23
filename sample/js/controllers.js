'use strict';

angular.module('KeyValueApp.controllers', []);

var kvCtrl = angular.module('KeyValueApp.controllers');

kvCtrl.controller("KeyValueCtrl", function($scope, KeyValueStorage){
    getValues();
    getCookies();

    $scope.setValue = function(k,v){
        KeyValueStorage.put(k,v);
        getValues();
        getCookies();
    };

    $scope.readValue = function(k){
        $scope.valueRead = KeyValueStorage.get(k);
    };

    $scope.delValue = function(k){
        KeyValueStorage.remove(k);
        getValues();
        getCookies();
    };

    function getValues() {
        var values = [],
            keys = Object.keys(localStorage);

        angular.forEach(keys,function(key){
            values.push( { key: key, value: KeyValueStorage.get(key) } )
        })

        $scope.valuesStorage = values;
    }

    function getCookies(){
        var cookies = document.cookie.split(";");
        $scope.cookies = cookies;
    }
});