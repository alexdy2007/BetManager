/**
 * Created by ayoung on 20/08/16.
 */

(function () {
    'use strict';

    angular
        .module('betManager.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http','$state'];

    /**
     * @namespace Authentication
     * @returns {Factory}
     */

    function Authentication($cookies, $http, $state) {
        /**
         * @name Authentication
         * @desc The Factory to be returned
         */
        var Authentication = {
            login:login
        };

        return Authentication;



        /**
         * @name login
         * @desc Try to log in with email `email` and password `password`
         * @param {string} email The email entered by the user
         * @param {string} password The password entered by the user
         * @returns {Promise}
         * @memberOf tennisrival.authentication.services.Authentication
         */
        function login(email, password) {
            return $http.post('auth/login', {
                email: email, password: password
            }).then(loginSuccessFn, loginErrorFn);

        }

        /**
         * @name loginSuccessFn
         * @desc Set the authenticated account and redirect to index
         */
        function loginSuccessFn(data, status, headers, config) {

            Authentication.setAuthenticatedAccount(data.data);
            $state.go("homepage");
        }

        /**
         * @name loginErrorFn
         * @desc Log "Epic failure!" to the console
         */
        function loginErrorFn(data, status, headers, config) {
            console.error('failure to login, Person needs to remember username and password!');
            console.error(data)
        }





    }
})();