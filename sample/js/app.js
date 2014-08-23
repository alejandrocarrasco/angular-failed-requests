'use strict';

// Declare app level module which depends on filters, and services
var failedReqApp = angular.module('FailedReqApp', [
    'FailedReqApp.controllers',
    'FailedRequestsHandler',
    'ngCookies'
    ]);

failedReqApp.config(function (){
   // No conf
});