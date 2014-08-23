'use strict';

angular.module('FailedReqApp.controllers', []);

var kvCtrl = angular.module('FailedReqApp.controllers');

kvCtrl.controller("FailedReqCtrl", function($scope, $http, $timeout, KeyValueStorage){

    $scope.sendFailingRequest = function (req) {
        $http({
                method: req.method,
                url: '/non-existant/' + req.path,
                data: req.data
        });
        $timeout(getValues, 500);
        getCookies();
    };

    $timeout(getValues, 500);
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
        });

        $scope.valuesStorage = values;
    }

    function getCookies(){
        var cookies = document.cookie.split(";");
        $scope.cookies = cookies;
    }
});