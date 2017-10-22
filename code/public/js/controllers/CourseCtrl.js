angular.module('CourseCtrl', []).controller('CourseController', function ($scope, $http) {

    $scope.tagline = 'Here you can see all the listed courses!';

    $scope.courses = 'Here we should see the courses';

    $scope.search = function (formData) {
        $http.post('/chercher', formData).then(function (res) {
            console.log(res.data[0].course_name);
            console.log("posted successfully");
        }).catch(function (err) {
            console.error("error in posting");
        });

    };

    $scope.loadCourses = function () {
        $http.get('/api/courses').then(function (res) {
            console.log(res.data);
            console.log("posted successfully");
        }).catch(function (err) {
            console.error("error in posting");
        });
    };
})
;