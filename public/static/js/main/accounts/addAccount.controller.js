/**
 * Created by ayoung on 07/09/16.
 */
(function () {
    "use strict";
    
    angular.module('betManager.main.controllers')
        .controller('addAccountCtrl', addAccountCtrl);

    addAccountCtrl.$inject = ['$uibModalInstance', 'userData'];
    function addAccountCtrl($uibModalInstance, userData) {
        var vm = this;
        vm.userData = userData;
        vm.selected = {
            userData: vm.userData[0]
        };

        vm.ok = function () {
            $uibModalInstance.close(vm.selected.item);
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };
    };

})();