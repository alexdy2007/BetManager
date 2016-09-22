/**
 * Created by ayoung on 22/09/16.
 */

angular.module('betManager.main.filters')
    .filter('capitalize', capitalize);



function capitalize(){
    return function(input) {
        return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
};