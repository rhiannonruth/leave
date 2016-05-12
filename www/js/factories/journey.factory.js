angular.module('smartAlarm').factory('journeyFactory', function($rootScope) {

    journey = {};
    journey.fromStation = '';
    journey.toStation = '';
    journey.time = '';
    return journey;

});
