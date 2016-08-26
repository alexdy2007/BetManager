/**
 * Created by ayoung on 26/08/16.
 */
/**
 * Created by ayoung on 20/08/16.
 */

(function () {
    'use strict';

    angular
        .module('betManager.main.services')
        .service('helperService', helperService);


    helperService.$inject = ['$cookies'];

    function helperService($cookies) {
        
        var helpers = {
            getUserName: getUserName
        };

        return helpers;
        
        
        function getUserName(){
            var hashUser = $cookies.get("randomString");
            if(hashUser !== undefined) {
                hashUser = hashUser.replace('"', "");
                return hashUser.split("-")[0]
            }
            return "";
        }
    }



})();