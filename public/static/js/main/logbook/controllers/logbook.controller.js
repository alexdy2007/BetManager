/**
 * Created by ayoung on 26/08/16.
 */
/**
 * Created by ayoung on 13/08/16.
 */

(function () {
    'use strict';

    angular
        .module('betManager.main.controllers')
        .controller('logBookCtrl', logBookCtrl);

    logBookCtrl.$inject = ['$scope', 'betManagerApi'];



    /**
     * @namespace logBookCtrl
     */
    function logBookCtrl($scope, betManagerApi) {
        
        var vm = this;
        vm.showOpenBets = true;
        vm.name = "logbook";
        vm.case_bets;
        vm.betSummary = {};
        vm.editMode = false;


        vm.logbookApi = betManagerApi.logbookoverview;
        vm.calcBetProfit = calcBetProfit;
        vm.getBets = getBets;

        getBets();

        function getBets(){
            vm.logbookApi.get().$promise.then(function(response){
                console.log(response);
                vm.betSummary.totalBets = response.data.length;
                vm.case_bets = _.groupBy(response.data, function(bet){ return bet.betcaseid; });
                vm.safe_case_bets = [].concat(vm.case_bets);
            })
        }

        function calcBetProfit(betCase){
            var profit = _.reduce(betCase, function(memo, bet){return memo + parseFloat(bet.profit);}, 0);
            return profit;
        }


        $scope.$on("modalClosing",function(event, changed){
            if(changed) {
                getBets()
            }
        });


        $scope.$watch("vm.case_bets", function(newCaseBets){
            var totalProfit = 0;
            var betCasesStatuses = {'won':0, 'lost':0};
            if (newCaseBets[0]) {
                for (var betCase in newCaseBets[0]) {
                    totalProfit = totalProfit + calcBetProfit(newCaseBets[0][betCase]);
                    var temp_status = _.countBy(newCaseBets[0][betCase], function (bet) {
                        return bet.betstatusid == 2 ? 'won' : bet.betstatusid == 3 ? "lost" : "other";
                    });
                    betCasesStatuses['won'] = betCasesStatuses['won'] + temp_status['won'];
                    betCasesStatuses['lost'] = betCasesStatuses['lost'] + temp_status['lost'];

                }
                vm.betSummary.totalProfit = totalProfit;
                vm.betSummary.betCasesStatuses = betCasesStatuses;
                vm.betSummary.winPercentage = (betCasesStatuses['won'] / (betCasesStatuses['lost'] + betCasesStatuses['won'])) * 100;
                vm.betSummary.averageWin = totalProfit / (betCasesStatuses['lost'] + betCasesStatuses['won']);
            }
        });
    }
})();