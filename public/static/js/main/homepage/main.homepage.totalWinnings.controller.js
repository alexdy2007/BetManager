/**
 * Created by ayoung on 13/08/16.
 */

(function () {
    'use strict';

    angular
        .module('betManager.main.controllers')
        .controller('TotalWinningsCtrl', TotalWinningsCtrl);

    TotalWinningsCtrl.$inject = ['$scope', '$state'];

    /**
     * @namespace TotalWinningsCtrl
     */
    function TotalWinningsCtrl($scope, $state) {
        var vm = this;
        vm.hideTotalWinnings = true;

    }
})();