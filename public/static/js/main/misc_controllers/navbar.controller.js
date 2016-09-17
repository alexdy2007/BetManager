/**
 * Created by ayoung on 26/08/16.
 */


(function () {
    'use strict';

    angular
        .module('betManager.main.controllers')
        .controller('navbarCtrl', navbarCtrl);

    navbarCtrl.$inject = ['$scope', '$cookies', '$state', '$uibModal', 'helperService', 'authService'];

    /**
     * @namespace ThisWeekCtrl
     */
    function navbarCtrl($scope, $cookies, $state, $uibModal, helperService, authService) {
        var vm = this;
        
        $scope.getUserName = getUserName;
        $scope.getCurrentState = getCurrentState;
        $scope.logout = logout;
        $scope.openAddBet = openAddBet;
        $scope.openComponentModal;
        $scope.userData = ["abc", "def"];
        $scope.clearCookies = clearCookies;


        function getCurrentState(){
            return $state.current.name;
        }
        
        function getUserName(){
            return helperService.getUserName();
        }

        function logout() {
            authService.logOut().then(function() {
                $state.go('login');
            });
        }

        function openAddBet(size){
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'Add Bet',
                ariaDescribedBy: 'add Bet',
                templateUrl: '/static/partials/addbet.modal.html',
                controller: 'addBetCtrl',
                controllerAs: 'vm',
                resolve: {
                    userData: function () {
                        return $scope.userData;
                    }
                }
            });
        }

        function clearCookies(){
            $cookies.remove("connect.sid");
            $cookies.remove("remember_me");

        }

    }
})();