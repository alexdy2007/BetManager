/**
 * Created by ayoung on 21/09/16.
 */

/**
 * @desc Shows in logbook for event description on bet market fbAbsolute
 * @example <div fb-absolute></div>
 */
angular
    .module('betManager.main.directives')
    .directive('fbAbsolute', fbAbsolute);

function fbAbsolute() {
    return {
        restrict:'E',
        templateUrl: '/static/partials/bet_events/fb_absolute.html'
    };
}
