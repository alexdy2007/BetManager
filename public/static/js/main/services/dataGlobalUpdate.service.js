/**
 * Created by ayoung on 02/10/16.
 */


(function () {
    'use strict';

    angular
        .module('betManager.main.services')
        .service('globalDataRefreshService', globalDataRefreshService);


    globalDataRefreshService.$inject = ['betManagerApi','$rootScope'];

    function globalDataRefreshService(betManagerApi, $rootScope) {

        var globalDataServices = {
            updateRootBetTypes:updateRootBetTypes,
            updateRootBookieAccounts:updateRootBookieAccounts
        };

        return globalDataServices;
        
        function updateRootBetTypes(){
            betManagerApi.bettype.get().$promise.then(function(response) {
                $rootScope.data.betTypes = response.data
            })
        }

        function updateRootBookieAccounts(){
            betManagerApi.bookieaccountoverview.get().$promise.then(function(response) {
                $rootScope.data.bookieAccounts = response.data
            })
        }
        


    }



})();