/**
 * Created by ayoung on 02/10/16.
 */

/**
 * @desc Shows in add bet modal for adding bet related fields to winner
 * @example <fb-correct-score></fb-correct-score>
 */

angular
    .module('betManager.main.directives')
    .directive('fbCorrectScore', fbCorrectScore);

function fbCorrectScore() {
    return {
        restrict:'E',
        templateUrl: '/static/partials/add_bet/fbcorrectscore.html'
    };
}
