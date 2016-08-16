/**
 * Created by ayoung on 12/08/16.
 */
(function () {
    'use strict';

    angular.module("betManager", ["ui.router",
        "ui.bootstrap",
        "betManager.main.controllers",
        "betManager.main.services"]).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {

            $locationProvider.html5Mode({
                enabled: true
            });

            $locationProvider.hashPrefix('!');
    
            $urlRouterProvider.otherwise('/homepage');
            $stateProvider
                .state('homepage', {
                    url: '/homepage',

                    controller: 'HomePageCtrl',
                    controllerAs: 'vm',

                    views: {

                        '':{templateUrl: '/static/partials/homepage.html'},

                        
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
        }).run(run);


    run.$inject = ['$http'];
    
    function run($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }

    angular.module("betManager.authentication", []);
    angular.module("betManager.main", []);


})();
