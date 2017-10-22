angular.module('ReservationCtrl', []).controller('ReservationController', function ($scope, $http, $routeParams) {
    $scope.courseId = $routeParams.courseId;

    $scope.init = function () {
        $http.get('/api/getCourse/'+$routeParams.courseId).then(function (res) {
            $scope.course = res.data;
            console.log(res.data);
        }).catch(function (err) {
            console.error(err);
        });
    };
});
