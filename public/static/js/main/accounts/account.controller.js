
/**
 * Created by ayoung on 26/08/16.
 */
/**
 * Created by ayoung on 13/08/16.
 */

(function () {
    'use strict';

    angular
        .module('betManager.main.controllers')
        .controller('accountCtrl', accountCtrl);

    accountCtrl.$inject = ['$scope', '$uibModal'];



    /**
     * @namespace accountsCtrl
     */
    function accountCtrl($scope, $uibModal) {
        var vm = this;
        vm.name = "Accounts";
        vm.userData = ["abc", "def"];
        vm.getAccountData = getAccountData;
        vm.openAddAccount = openAddAccount;

        
        function getAccountData(){
            bookieaccountoverview
        }
        
        
        function openAddAccount() {
            var modalInstance = $uibModal.open({
                animation: true,
                ariaLabelledBy: 'Add Account',
                ariaDescribedBy: 'Add Account',
                templateUrl: '/static/partials/addaccount.modal.html',
                controller: 'addAccountCtrl',
                controllerAs: 'vm',
                resolve: {
                    userData: function () {
                        return vm.userData;
                    }
                }
            });
        }
    }
})();