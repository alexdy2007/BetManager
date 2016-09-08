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

    LoginController.$inject = ['$scope', '$state', 'authService'];

    /**
     * @namespace LoginController
     */
    function LoginController($scope, $state, authService) {
        var vm = this;

        vm.login = login;
        /**
         * @name login
         * @desc Log the user in
         * @memberOf cvprofile.authentication.controllers.LoginController
         */

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