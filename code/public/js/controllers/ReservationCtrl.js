angular.module('ReservationCtrl', []).controller('ReservationController', function ($scope, $routeParams) {
    $scope.courseId = $routeParams.courseId;

});
