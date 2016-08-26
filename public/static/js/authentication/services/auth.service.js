/**
 * Created by ayoung on 20/08/16.
 */

(function () {
    'use strict';

    angular
        .module('betManager.authentication.services')
        .service('AuthService', AuthService)
        .factory('AuthInterceptFactory', AuthInterceptFactory)
        .config(AuthConfig);


    AuthService.$inject = ['$cookies', '$http', '$state', '$q', 'ngToast'];
    // AuthInterceptFactory.$inject = ['$rootScope', '$q'];
    // AuthConfig.$inject = ['$httpProvider'];
    /**
     * @namespace Authentication
     * @returns {Factory}
     */

    function AuthService($cookies, $http, $state, $q, ngToast) {
        /**
         * @name Authentication
         * @desc The Factory to be returned
         */
        var Authentication = {
            login: login,
            setAuthenticatedAccount: setAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            logOut: logOut
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
                'email': email, password: password
            }).then(loginSuccessFn, loginErrorFn);

        }

        /**
         * @name loginSuccessFn
         * @desc Set the authenticated account and redirect to index
         */
        function loginSuccessFn(data) {
            Authentication.setAuthenticatedAccount(data.data);
            $state.go("homepage");
        }

        /**
         * @name loginErrorFn
         * @desc Log "Epic failure!" to the console
         */
        function loginErrorFn(data, status, headers, config) {
            ngToast.create({
                className: 'danger',
                content: "<div> Incorrect username or password </div>"
            });
            console.error('failure to login, Person needs to remember username and password!');
            console.error(data)
        }


        function setAuthenticatedAccount(response) {
            $cookies.putObject("randomString", response.randomString);
        }

        function isAuthenticated() {

            function sucessfulAuth(data) {
                return true;
            }

            function failureAuth(data){
                $cookies.remove('randomString');
                return $q.reject(false);
            };


            var randomString = $cookies.get('randomString');
            if (randomString === undefined) {
                randomString = "a-NonExistant";
            }
            return $http.post('auth/auth', {
                'randomString': randomString
            }).then(sucessfulAuth, failureAuth)


        };


        function logOut() {
            $cookies.remove('randomString');
        }

    }

    function AuthInterceptFactory($injector, $q) {
        return {
            responseError: function (response) {
                if (response.status == 401 | response.status == 403){
                    return $q.reject(response);
                }
                return $q.reject(response);
            }
        };
    }

    function AuthConfig($httpProvider) {
        $httpProvider.interceptors.push('AuthInterceptFactory');
    };

})();