angular.module('CourseCtrl', []).controller('CourseController', function ($scope, $http) {

    $scope.tagline = 'Here you can search all the listed courses. Just start typing, and it will automatigally search for you.';

    $scope.init = function () {
            $http.get('/api/allCourses').then(function (res) {
            $scope.searchCoursesResult = res.data;
        }).catch(function (err) {
            console.error(err);
        });
    };

    $scope.searchCourses = function (formData) {
        $http.post('/api/searchCourses', formData).then(function (res) {
            $scope.searchCoursesResult = res.data;
        }).catch(function (err) {
            console.error(err);
        });
    };
})
;