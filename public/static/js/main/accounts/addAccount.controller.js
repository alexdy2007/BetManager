/**
 * Created by ayoung on 07/09/16.
 */
(function () {
    "use strict";

    angular.module('betManager.main.controllers')
        .controller('addAccountCtrl', addAccountCtrl);

    addAccountCtrl.$inject = ['$uibModalInstance', '$q', '$filter', '$scope', 'userData', 'betManagerApi'];
    function addAccountCtrl($uibModalInstance, $q, $filter, $scope,  userData, betManagerApi) {
        var vm = this;

        vm.userData = userData;
        vm.accountbookie = {statusactive:true};
        
        vm.ok = ok;
        vm.cancel = cancel;

        vm.bookieSearch = bookieSearch;
        vm.saveBookie = saveBookie;

        vm.updateCommission = updateCommission;

        getBookies();

        function ok() {
            $uibModalInstance.close(vm.selected.item);
        };

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        };

        function bookieSearch(query) {
            var q = $q.defer();
            findValues( query, vm.bookie).then( function ( res ) {
                q.resolve( res );
            } );
            return q.promise;
        }

        function findValues ( query, data ) {
            var deferred = $q.defer();
            deferred.resolve( $filter( 'filter' )( data, query ) );
            return deferred.promise;
        }


        function getBookies() {
            var Bookie = betManagerApi.bookie;
            Bookie.get().$promise.then(function (bookieResponse) {
                if (bookieResponse.success) {
                    vm.bookie = bookieResponse.data
                } else {
                    console.log("Failed to load bookie data");
                }
            });
        }

        function saveBookie() {
            var bookieSend = {};
            bookieSend.commission = vm.accountbookie.commission/100;
            bookieSend.username = vm.accountbookie.username;
            bookieSend.bookieid = vm.accountbookie.bookie.id;
            bookieSend.active = vm.accountbookie.statusactive;
            var BookieAccount = betManagerApi.bookieacccount;
            BookieAccount.save(bookieSend).$promise.then(function(response){
                console.log(response);
                vm.accountbookie = {statusactive:true};
                $scope.accountform.$setUntouched();
                $scope.accountform.$setPristine();
            }).catch(function(err){
                console.log(err);
            })
        }

        function updateCommission() {
            vm.accountbookie.commission = vm.accountbookie.bookie.defaultcommission * 100;
        }
    };


})();