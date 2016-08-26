/**
 * Created by ayoung on 13/08/16.
 */

(function () {
    'use strict';

    angular
        .module('betManager.main.controllers')
        .controller('HomePageCtrl', HomePageCtrl);

    HomePageCtrl.$inject = ['$scope'];



    /**
     * @namespace HomePageController
     */
    function HomePageCtrl($scope) {
        

        var vm = this;
        vm.hello = "hello"

    }
})();