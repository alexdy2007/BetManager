/**
 * Created by ayoung on 01/10/16.
 */

/**
 * Created by ayoung on 24/09/16.
 */



/**
 * @desc Shows in add bet modal for adding bet related fields to winner
 * @example <football-bet-event></football-bet-event>
 */

angular
    .module('betManager.main.directives')
    .directive('footballBetEvent', footballBetEvent);

function footballBetEvent() {
    return {
        restrict:'E',
        templateUrl: '/static/partials/add_bet/footballevent.html'
    };
}
