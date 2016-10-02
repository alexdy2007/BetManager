/**
 * Created by ayoung on 22/09/16.
 */


/**
 * @desc Shows in add bet modal for adding common bet fields
 * @example <div add-bet-common></div>
 */

angular
    .module('betManager.main.directives')
    .directive('addBetCommon', addBetCommon);

function addBetCommon() {
    return {
        restrict:'E',
        templateUrl: '/static/partials/add_bet/commonbet.html'
    };
}
