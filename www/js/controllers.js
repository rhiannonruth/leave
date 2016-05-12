angular.module('smartAlarm.controllers', [])

.controller('LandingCtrl', function($scope, $state, $timeout) {
  $timeout(function() {
    $state.go('tab.dashboard');
  }, 2000);
})

.controller('DashboardCtrl', function($scope) {

})

.controller('WeatherCtrl', function($scope, CurrentWeather) {
  CurrentWeather.success(function(data){
    $scope.description = data.description;
    $scope.temperature = data.temperature;
  });
})

.controller('TravelPlanCtrl', function ($scope, $cordovaLocalNotification, Notification, StationList, PostTrip, GetTrip, $http, $rootScope) {

  StationList.success(function(data) {
    $scope.stationNames = data;
  });

  $scope.getTime = function(trip) {
    var newTime     = trip.time.toString().substr(16, 5);

    var tripDetails = {'alarm':
                        { 'from_station': trip.fromStation.ICS_Code,
                          'to_station'  : trip.toStation.ICS_Code,
                          'arrival_time': newTime,
                          'alarm_offset': '0'
                        }
                      };

    PostTrip(tripDetails).success(function(data){
      return GetTrip(data).success(function(data){
        $rootScope.timeToLeave = data.time_to_leave;
        $rootScope.alarmMessage ="Your alarm has been set for " + $rootScope.timeToLeave;
        $rootScope.dashboardMessage = "LEAVE at " + $rootScope.timeToLeave;
        new Notification(data);
      });
    });
  };
})

.controller('SignupCtrl', function($scope, $state, SignUp, $location) {
  $scope.signUp = function(email, password) {
    var details = { 'email'   : email,
                    'password': password };
    new SignUp(details);
    $location.path('/tab/login');
  };
});
