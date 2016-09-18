/**
 * Created by ayoung on 20/08/16.
 */

(function() {
	'use strict';

	angular
		.module('betManager.authentication.services')
		.service('authService', authService)
		.factory('authInterceptFactory', authInterceptFactory)
		.config(authConfig);


	authService.$inject = ['$cookies', '$http', '$state', '$q', 'ngToast'];
	// authInterceptFactory.$inject = ['$rootScope', '$q'];
	// authConfig.$inject = ['$httpProvider'];
	/**
	 * @namespace Authentication
	 * @returns {Factory}
	 */

	function authService($cookies, $http, $state, $q, ngToast) {
		/**
		 * @name Authentication
		 * @desc The Factory to be returned
		 */
		var Authentication = {
			login: login,
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
				'email': email,
				password: password
			}).then(loginSuccessFn, loginErrorFn);

		}

		/**
		 * @name loginSuccessFn
		 * @desc Set the authenticated account and redirect to index
		 */
		function loginSuccessFn(data) {
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
			//console.error('failure to login, Person needs to remember username and password!');
			console.error(data)
		}


		function isAuthenticated() {

			function sucessfulAuth(data) {
				return data;
			}

			function failureAuth(data) {
				return $q.reject(false);
			};

			return $http.post('auth/auth', {}).then(sucessfulAuth, failureAuth)


		};


		function logOut() {

			function failureLogout() {
				$cookies.remove('remember_me');
				console.error("failed to log out server side");
				return
			}

			function sucessfulLogout() {
				$cookies.remove('remember_me');
				return
			}

			console.log("logout");
			return $http.post('auth/logout', {}).then(sucessfulLogout, failureLogout)
		}

	}

	authInterceptFactory.$inject = ["$injector", "$q"];

	function authInterceptFactory($injector, $q) {
		return {
			responseError: function(response) {
				if (response.status == 401 | response.status == 403) {
					return $q.reject(response);
				}
				return $q.reject(response);
			}
		};
	}

	authConfig.$inject = ['$httpProvider'];

	function authConfig($httpProvider) {
		$httpProvider.interceptors.push('authInterceptFactory');
	};

})();
