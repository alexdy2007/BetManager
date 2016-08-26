/**
 * Created by ayoung on 26/08/16.
 */


(function () {
    'use strict';

    angular
        .module('betManager.main.controllers')
        .controller('navbarCtrl', navbarCtrl);

    navbarCtrl.$inject = ['$scope', '$cookies', '$state', 'helperService'];

    /**
     * @namespace ThisWeekCtrl
     */
    function navbarCtrl($scope, $cookies, $state, helperService) {
        var vm = this;
        
        $scope.getUserName = getUserName;
        $scope.getCurrentState = getCurrentState;
        $scope.logout = logout;
        
        function getCurrentState(){
            return $state.current.name;
        }
        
        function getUserName(){
            return helperService.getUserName();
        }

        function logout(){
            $cookies.remove("randomString");
            $state.go('login');
        }
    }
})();