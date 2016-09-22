/**
 * Created by ayoung on 15/09/16.
 */

(function () {
    'use strict';

    angular
        .module('betManager.main.services')
        .service('betManagerApi', betManagerApi);


    betManagerApi.$inject = ['$resource'];

    function betManagerApi($resource) {

        var resources = {
            bookie: $resource("/api/bookie/:id", {id:'@id'}),
            bookieacccount: $resource("/api/bookieaccount/:id", {id:'@id'}),
            bookieaccountoverview: $resource("/api/bookieaccountoverview/"),
            bet: $resource("/api/bet/:id", {id:'@id'}),
            logbookoverview: $resource("/api/logbookoverview/:id", {id:'@id'}),
        };

        return resources;

    }



})();