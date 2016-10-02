/**
 * Created by ayoung on 24/09/16.
 */



/**
 * @desc Shows in add bet modal for adding bet related fields to winner
 * @example <winner-bet-fields></winner-bet-fields>
 */

angular
    .module('betManager.main.directives')
    .directive('winnerBetFields', winnerBetFields);

function winnerBetFields() {
    return {
        restrict:'E',
        templateUrl: '/static/partials/add_bet/winnerbet.html'
    };
}
