/**
 * Created by ayoung on 22/09/16.
 */

/**
 * @desc Shows in logbook for event description on bet market fb_ht_ft_score
 * @example <div fb-ht-ft></div>
 */
angular
    .module('betManager.main.directives')
    .directive('fbHtFt', FbHtFtScore);

function FbHtFtScore() {
    return {
        restrict:'E',
        templateUrl: '/static/partials/bet_events/fb_ht_ft_score.html'
    };
}
