/**
 * Created by ayoung on 07/09/16.
 */
(function () {
    "use strict";




    angular.module('betManager.main.controllers')
        .controller('addBetCtrl', addBetCtrl);


    addBetCtrl.$inject = ['$scope','$rootScope', '$uibModalInstance', '$window', '$mdSelect', '$mdMenu', '$q', '$filter', 'changed', 'betManagerApi'];
    function addBetCtrl($scope, $rootScope, $uibModalInstance, $window, $mdSelect, $mdMenu, $q, $filter,changed, betManagerApi) {

        $window.addEventListener('blur', function() {
            $mdSelect.hide();
            $mdMenu.hide();
        });


        var vm = this;
        
        vm.changed = false;
        vm.betcaseid = null;
        
        vm.picks = [
            "Home Team Win",
            "Home Team Not Win",
            "Away Team Win",
            "Away Team Not Win",
            "Draw",
            "Not Draw",
            "Home Team Lose",
            "Home Team Not Lose",
            "Away Team Lose",
            "Away Team Not Lose"
        ];

        var betMarketApi = betManagerApi.betmarket;
        var bookieBookieAccountsApi = betManagerApi.bookieandbet;
        var betStatusApi = betManagerApi.betstatus;
        var betApi = betManagerApi.bet;

        vm.saveBet = saveBet;
        vm.getBetMarkets = getBetMarkets;
        vm.refreshAdditionalData = refreshAdditionalData;
        vm.betMarketSearch = betMarketSearch;
        vm.bookieAccountSearch = bookieAccountSearch;
        vm.updateCommission = updateCommission;
        vm.getBetTypes = getBetTypes;
        vm.getBetStatus = getBetStatus;

        vm.ok = function () {
            $uibModalInstance.close(vm.changed);
        };

        vm.cancel = function () {
            $uibModalInstance.dismiss(vm.changed);
        };

        addBetReset();
        getBookieAndBookieAccount();
        getBetStatus();
        getBetTypes();

        function addBetReset(){
            vm.addBet = {betstatusid:null};

        }
        function saveBet(){
            if($scope.addBetForm.$valid){
                formatPickToSend();
                if(vm.betcaseid){
                    vm.addBet.betcaseid = vm.betcaseid
                }
                vm.addBet.betmarketid = vm.betmarketSelected.id;
                vm.addBet.bookieaccountid = vm.bookieAccountSelected.id;
                betApi.save(vm.addBet).$promise.then(function(response){
                    addBetReset();
                    vm.changed = true;
                    $scope.addBetForm.$setUntouched();
                    $scope.addBetForm.$setPristine();
                }).catch(function(err){
                    console.log(err);
                })
            }else{
                 console.log("Not valid data")
            }
        }

        function formatPickToSend() {

            function findResult() {
                if (vm.pick.includes("Win")) {
                    return "Win";
                } else if (vm.pick.includes("Draw")) {
                    return "Draw"
                } else if (vm.pick.includes("Lose")) {
                    return "Lose"
                }
            }

            function findLayBet() {
                return vm.pick.includes("Not");
            }

            function findHomeTeamSelected() {
                return vm.pick.includes("Home");
            }



            if(vm.pick != null){
                vm.addBet.bet_specific.result = findResult();
                vm.addBet.laybet = findLayBet();
                vm.addBet.bet_specific.hometeamselected = findHomeTeamSelected();
            }else{
                throw Error("unable to format pick")
            }
        }


        $scope.$on("modal.closing",function(){
            $rootScope.$broadcast("modalClosing", vm.changed);
        });






        function getBookieAndBookieAccount(){
            bookieBookieAccountsApi.get().$promise.then(function(response){
                vm.bookieAccount = response.data;
            })
        }

        function getBetMarkets(sportid){
            betMarketApi.get({sportid:sportid}).$promise.then(function(response){
                vm.betMarkets =  response.data;
            })
        }

        function getBetTypes(){

                vm.betTypes = $rootScope.data.betTypes;
        }

        function getBetStatus(){
            betStatusApi.get().$promise.then(function(response){
                vm.betStatuses = response.data;
                if(vm.addBet.betstatusid === null){
                    vm.addBet.betstatusid = vm.betStatuses[0].id;
                }
            })
        }

        function refreshAdditionalData(){

        }

        function updateCommission(){
            vm.addBet.commission = vm.bookieAccountSelected.commission * 100;
        }


        function bookieAccountSearch(query) {
            var q = $q.defer();
            findValues( query, vm.bookieAccount).then( function ( res ) {
                q.resolve( res );
            } );
            return q.promise;
        }

        function betMarketSearch(query) {
            var q = $q.defer();
            findValues( query, vm.betMarkets).then( function ( res ) {
                q.resolve( res );
            } );
            return q.promise;
        }

        function findValues ( query, data ) {
            var deferred = $q.defer();
            deferred.resolve( $filter( 'filter' )( data, query ) );
            return deferred.promise;
        }


    };

})();