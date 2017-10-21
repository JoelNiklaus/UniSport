

angular.module('CourseCtrl', []).controller('CourseController', function($scope, CourseService) {

	$scope.tagline = 'Here you can see all the listed courses!';

	$scope.courses = 'Here we should see the courses';

	$scope.loadCourses = function () {
        $http.get('/api/nerds');
    };

});