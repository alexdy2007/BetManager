/**
 * Created by ayoung on 12/08/16.
 */
(function () {
    'use strict';

    angular.module("betManager", ["ui.router",
        "ui.bootstrap",
        'ngCookies',
        'ngToast',
        "betManager.main",
        "betManager.authentication"]).config(function ($stateProvider, $urlRouterProvider, $locationProvider, ngToastProvider) {
            $locationProvider.html5Mode({
                enabled: true
            });

            ngToastProvider.configure({
                timeout: 4000,
                animation:'slide',
                maxNumber:3,
            });

            $locationProvider.hashPrefix('!');
            $urlRouterProvider.otherwise('/login');
            $stateProvider
                .state('homepage', {
                    url: '/homepage',
                    views: {
                        '':{
                            controller: 'HomePageCtrl',
                            controllerAs: 'vm',
                            templateUrl: '/static/partials/homepage.html'},
                        "totalWinnings@homepage": {
                            templateUrl: '/static/partials/homepage.totalwinnings.html',
                            controller: 'TotalWinningsCtrl',
                            controllerAs: 'vm'
                        },
                        "thisWeek@homepage": {
                            templateUrl: '/static/partials/homepage.thisweek.html',
                            controller: 'ThisWeekCtrl',
                            controllerAs: 'vm'
                        }
                    }
                })
                .state('login', {
                    url: '/login',
                    templateUrl: '/static/partials/login.html',
                    controller:'LoginController',
                    controllerAs:'vm'
                });
        

    }).run(run);


    run.$inject = ['$http', '$state', '$rootScope', '$q', 'AuthService'];
    
    function run($http, $state, $rootScope, $q, AuthService) {



        function waitForAuth(event, next){

            function successfulAuth(data){
                console.log(next.name);
                if (next.name === 'login') {
                    event.preventDefault();
                    $state.go('homepage');
                }
                deferred.resolve();
            }

            function failAuth(data){
                console.log("Failed auth " + data);
                event.preventDefault();
                $state.go('login');
                defered.reject();
            }

            var deferred = $q.defer();
            AuthService.isAuthenticated().then(successfulAuth, failAuth);
            return deferred.promise
        }

        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
        $rootScope.$on('$stateChangeStart', function (event, next, nextParams, fromState) {
            waitForAuth(event, next).then(function(){});
        })
    }

    angular.module("betManager.authentication", []);
    angular.module("betManager.main", []);


})();
