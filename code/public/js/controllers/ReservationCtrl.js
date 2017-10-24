angular.module('ReservationCtrl', []).controller('ReservationController', function ($scope, $http, $routeParams) {
    $scope.course_id = $routeParams.course_id;

    $scope.init = function () {
        $http.get('/api/getCourse/'+$routeParams.course_id).then(function (res) {
            $scope.course = res.data;
            console.log(res.data);
        }).catch(function (err) {
            console.error(err);
        });
    };

    // TODO perform more client side form validation

    $scope.makeReservation = function (formData) {
        if(formData.$valid){
            var newformData= angular.copy(formData);

        formData.course_id = $scope.course_id;
        $http.post('/api/makeReservation', newformData).then(function (res) {
            $scope.success = "Successfully reserved a space.";
            console.log(res);
        }).catch(function (err) {
            $scope.danger = "An error occurred. Could not reserve a space: " + err;
            console.error(err);
        });
    }
}
});
