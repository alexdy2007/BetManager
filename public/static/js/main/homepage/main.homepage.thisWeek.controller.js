/**
 * Created by ayoung on 13/08/16.
 */
/**
 * Created by ayoung on 13/08/16.
 */

(function () {
    'use strict';

    angular
        .module('betManager.main.controllers')
        .controller('ThisWeekCtrl', ThisWeekCtrl);

    ThisWeekCtrl.$inject = ['$scope', '$state'];

    /**
     * @namespace ThisWeekCtrl
     */
    function ThisWeekCtrl($scope, $state) {
        var vm = this;
        vm.name = "week ctrl"

    }
})();