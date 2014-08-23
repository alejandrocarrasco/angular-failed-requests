/**
 * Module to retry failed AJAX write requests.
 * @description: This module intercepts any AJAX failed request and saves it
 *               in localStorage to retry again when the app is reloaded.
 * @requires: localStorage module for localStorage or cookies management
 * @author: Alejandro Carrasco
 */
angular.module('FailedRequestsHandler', ['KeyValueStorage']);

var failedReqHandler = angular.module('FailedRequestsHandler');

failedReqHandler.config(function($httpProvider){
    $httpProvider.interceptors.push('FailedRequestsInterceptor');
});

failedReqHandler.run(function(FailedRequestsSolver){
    FailedRequestsSolver.resolveFailedRequests();
});

failedReqHandler.service('FailedRequestsHandler', function(KeyValueStorage){
    // Recover the last requests queue if they exist
    var requests = getFailedRequestsQueue();

    this.saveRequest = function(request){
        // If a write request remains pending, we save it
        if (request.config.method != "GET") {
	    console.log(request.status, ":\n", request.data);
            requests = getFailedRequestsQueue();
            // We append only the request config because we don't need the response
            requests.push(request.config);
            // And store it in the queue
            storeRequests();
        }
    };

    this.removeRequest = function(key){
        requests.splice(key, 1);
        updateRequests();
    }

    this.getFailedRequestsQueue = function(){
        return getFailedRequestsQueue();
    }

    function updateRequests(){
        storeRequests();
        requests = getFailedRequestsQueue();
    }

    function storeRequests() {
        KeyValueStorage.put("FailedRequestQueue", requests);
    }

    function getFailedRequestsQueue() {
        return KeyValueStorage.get("FailedRequestQueue") || [];
    }
});

failedReqHandler.service('FailedRequestsSolver', function($http, $timeout, FailedRequestsHandler){

    this.resolveFailedRequests = function(){
        angular.forEach(FailedRequestsHandler.getFailedRequestsQueue(), function (value, key) {
            console.log("Retrying request:\n",key,value);
            // We retry the request
            $http({
                method: value.method,
                headers: value.headers,
                data: value.data,
                url: value.url
            });
            // Remove the actual request
            FailedRequestsHandler.removeRequest(0);
        });
    }
})

failedReqHandler.factory('FailedRequestsInterceptor', function($q, FailedRequestsHandler){
    return {
        response: function(response){
            return response || $q.when(response);
        },
        responseError: function(rejection){
            // We save the request
            FailedRequestsHandler.saveRequest(rejection);
            return $q.reject(rejection);
        }
    }
});
