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
        $timeout(getQueue, 500);
    };

    $timeout(getQueue, 500);

    function getQueue() {
        $scope.reqsQueue = KeyValueStorage.get('FailedRequestQueue');
    }
});