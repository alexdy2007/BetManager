
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

    accountCtrl.$inject = ['$rootScope', '$uibModal', 'betManagerApi'];



    /**
     * @namespace accountsCtrl
     */
    function accountCtrl($rootScope, $uibModal, betManagerApi) {
        var vm = this;
        vm.name = "Accounts";
        vm.userData = ["abc", "def"];
        vm.bookieAccountOverview = betManagerApi.bookieaccountoverview;
        vm.getAccountData = getAccountData;
        vm.openAddAccount = openAddAccount;

        getAccountData();

        
        function getAccountData(){
            vm.bookieAccounts = $rootScope.data.bookieAccounts;
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

            modalInstance.result.then(function () {
                getAccountData();
            },function () {
                getAccountData();
            })
        };
    }
})();