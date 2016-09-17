/**
 * Created by ayoung on 20/08/16.
 */
/**
 * Created by ayoung on 21/04/16.
 */
/**
 * LoginController
 * @namespace betManager.authentication.controllers
 */
(function () {
    'use strict';

    angular
        .module('betManager.authentication.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$scope', '$state', 'authService', '$cookies'];

    /**
     * @namespace LoginController
     */
    function LoginController($scope, $state, authService, $cookies) {
        var vm = this;
        
        vm.login = login;

        function login() {
            authService.login(vm.email, vm.password);
        }
        

        // function checkAuthorised(){
        //     if(authService.isAuthenticated()){
        //         $state.go('homepage')
        //     };
        // }





    }
})();